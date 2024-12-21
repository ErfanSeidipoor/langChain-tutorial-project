import { JsonOutputKeyToolsParser } from "@langchain/core/output_parsers/openai_tools";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { z } from "zod";

import {
  RunnableConfig,
  RunnableLambda,
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { OllamaEmbeddings } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";
import { zodToJsonSchema } from "zod-to-json-schema";

(async function () {
  const texts = ["Harrison worked at Kensho", "Ankush worked at Facebook"];
  const vectorStores = await MemoryVectorStore.fromTexts(
    texts,
    [{}, {}],
    new OllamaEmbeddings({ model: "mxbai-embed-large" })
  );

  const retriever = vectorStores.asRetriever(1);

  const searchSchema = z
    .object({
      queries: z.array(z.string()).describe("Distinct queries to search for"),
    })
    .describe("Search over a database of job records.");

  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  const system = `You have the ability to issue search queries to get information to help answer user information.

  If you need to look up two distinct pieces of information, you are allowed to do that!`;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", system],
    ["human", "{question}"],
  ]);

  const llmWithTools = llm.withStructuredOutput(searchSchema, {
    name: "Search",
  });
  const queryAnalyzer = RunnableSequence.from([
    {
      question: new RunnablePassthrough(),
    },
    prompt,
    llmWithTools,
  ]);

  const response1 = await queryAnalyzer.invoke("where did Harrison work");
  console.log({ response1 });

  const response2 = await await queryAnalyzer.invoke(
    "where did Harrison and ankush Work"
  );
  console.log({ response2 });

  const chain = async (question: string, config?: RunnableConfig) => {
    const response = await queryAnalyzer.invoke(question, config);
    const docs = [];
    for (const query of response.queries) {
      const newDocs = await retriever.invoke(query, config);
      docs.push(...newDocs);
    }
    return docs;
  };

  const customChain = new RunnableLambda({ func: chain });

  const question3 = "where did Harrison Work";
  const response3 = await customChain.invoke(question3);
  console.log({ question3, response3 });

  const question4 = "where did Harrison and ankush Work";
  const response4 = await customChain.invoke(question4);
  console.log({ question4, response4 });
})();
