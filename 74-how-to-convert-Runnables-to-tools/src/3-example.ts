import { ChatOpenAI } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { z } from "zod";

const llm = new ChatOpenAI({ model: "gpt-3.5-turbo-0125", temperature: 0 });

(async function () {
  const documents = [
    new Document({
      pageContent:
        "Dogs are great companions, known for their loyalty and friendliness.",
    }),
    new Document({
      pageContent:
        "Cats are independent pets that often enjoy their own space.",
    }),
  ];

  const vectorstore = await MemoryVectorStore.fromDocuments(
    documents,
    new OpenAIEmbeddings()
  );

  const retriever = vectorstore.asRetriever({
    k: 1,
    searchType: "similarity",
  });

  const tools = [
    retriever.asTool({
      name: "pet_info_retriever",
      description: "Get information about pets.",
      schema: z.string(),
    }),
  ];
  const agent = createReactAgent({ llm: llm, tools });

  const stream = await agent.stream({
    messages: [["human", "What are dogs known for?"]],
  });

  for await (const chunk of stream) {
    // Log output from the agent or tools node
    if (chunk.agent) {
      console.log("AGENT:", chunk.agent.messages[0]);
    } else if (chunk.tools) {
      console.log("TOOLS:", chunk.tools.messages[0]);
    }
    console.log("----");
  }
})();
