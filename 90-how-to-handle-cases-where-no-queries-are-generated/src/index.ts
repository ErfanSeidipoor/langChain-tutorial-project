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
  const texts = ["Harrison worked at Kensho"];
  const vectorStores = await MemoryVectorStore.fromTexts(
    texts,
    [{}, {}],
    new OllamaEmbeddings({ model: "mxbai-embed-large" })
  );

  const retriever = vectorStores.asRetriever();

  const searchSchema = z.object({
    query: z
      .string()
      .describe("Similarity search query applied to job record."),
  });

  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  const system = `
    You have the ability to issue search queries to get information to help answer user information.
    
    You do not NEED to look things up. if you don't need to, then just respond normally.
  `;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", system],
    ["human", "{question}"],
  ]);

  const llmWithTools = llm.bind({
    tools: [
      {
        type: "function",
        function: {
          name: "search",
          description: "Search over a database of job records.",
          parameters: zodToJsonSchema(searchSchema),
        },
      },
    ],
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

  const response2 = await await queryAnalyzer.invoke("whats your name?");
  console.log({ response2 });

  const chain = async (question: string, config?: RunnableConfig) => {
    const response = await queryAnalyzer.invoke(question, config);
    if (
      "tool_calls" in response.additional_kwargs &&
      response.additional_kwargs.tool_calls !== undefined
    ) {
      const query = await new JsonOutputKeyToolsParser({
        keyName: "search",
      }).invoke(response, config);
      return retriever.invoke(query[0].query, config);
    } else {
      return response;
    }
  };

  const customChain = new RunnableLambda({ func: chain });
  const response3 = await customChain.invoke("where did Harrison Work");
  console.log({ response3 });
})();
