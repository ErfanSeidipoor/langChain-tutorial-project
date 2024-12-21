import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";
import { TextLoader } from "langchain/document_loaders/fs/text";

(async function () {
  const loader = new TextLoader("./example.txt");
  const docs = await loader.load();

  console.log({ docs });

  const vectorStore1 = await MemoryVectorStore.fromDocuments(
    docs,
    new OllamaEmbeddings({})
  );

  const resultOne1 = await vectorStore1.similaritySearch("hello word", 1);

  console.log(resultOne1);

  const vectorStore2 = await MemoryVectorStore.fromTexts(
    ["Hello world", "Bye bye", "hello nice world"],
    [{ id: 2 }, { id: 1 }, { id: 3 }],
    new OllamaEmbeddings()
  );

  const resultOne2 = await vectorStore2.similaritySearch("hello world", 1);

  console.log(resultOne2);
})();
