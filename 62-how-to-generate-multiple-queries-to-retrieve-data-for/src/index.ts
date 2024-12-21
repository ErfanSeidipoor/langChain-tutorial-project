import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

(async function () {
  const embeddings = new OllamaEmbeddings();

  const vectorStore = await MemoryVectorStore.fromTexts(
    [
      "Buildings are made out of brick",
      "Buildings are made out of wood",
      "Buildings are made out of stone",
      "Cars are made out of metal",
      "Cars are made out of plastic",
      "mitochondria is the powerhouse of the cell",
      "mitochondria is made of lipids",
    ],
    [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    embeddings
  );

  const model = new ChatOllama({
    model: "llama3.2",
  });

  const retriever = MultiQueryRetriever.fromLLM({
    llm: model,
    retriever: vectorStore.asRetriever(),
  });

  const query = "What are mitochondria made of?";

  const retrievedDocs = await retriever.invoke(query);

  console.log({ retrievedDocs });
})();
