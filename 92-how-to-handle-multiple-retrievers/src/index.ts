import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { z } from "zod";

import {
  RunnableConfig,
  RunnableLambda,
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";

(async function () {
  const embeddings = new OllamaEmbeddings({ model: "mxbai-embed-large" });

  const texts = ["Harrison worked at Kensho"];
  const vectorStores = await MemoryVectorStore.fromTexts(
    texts,
    [{}],
    embeddings
  );
  const retrieverHarrison = vectorStores.asRetriever(1);

  const textsAnkush = ["Ankush worked at Facebook"];
  const vectorstoreAnkush = await MemoryVectorStore.fromTexts(
    textsAnkush,
    [{}],
    embeddings
  );

  const retrieverAnkush = vectorstoreAnkush.asRetriever(1);

  const searchSchema = z.object({
    query: z.string().describe("Query to look up"),
    person: z
      .enum(["HARRISON", "ANKUSH"])
      .describe(
        "Person to look things up for. Should be `HARRISON` or `ANKUSH`."
      ),
  });

  const llm = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const system = `You have the ability to issue search queries to get information to help answer user information.`;
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

  const response1 = await queryAnalyzer.invoke("where did Harrison Work");
  console.log({ response1 });

  const response2 = await queryAnalyzer.invoke("where did ankush Work");
  console.log({ response2 });

  const retrievers = {
    HARRISON: retrieverHarrison,
    ANKUSH: retrieverAnkush,
  };

  const chain = async (question: string, config?: RunnableConfig) => {
    const response = await queryAnalyzer.invoke(question, config);
    const retriever = retrievers[response.person];
    return retriever.invoke(response.query, config);
  };

  const customChain = new RunnableLambda({ func: chain });
  const response3 = await customChain.invoke("where did Harrison Work");
  console.log({ response3 });

  const response4 = await customChain.invoke("where did ankush Work");
  console.log({ response4 });
})();
