import { OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ParentDocumentRetriever } from "langchain/retrievers/parent_document";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { InMemoryStore } from "@langchain/core/stores";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";

(async function () {
  const vectorstore = new MemoryVectorStore(new OllamaEmbeddings());
  const byteStore = new InMemoryStore<Uint8Array>();

  const childDocumentRetriever = ScoreThresholdRetriever.fromVectorStore(
    vectorstore,
    {
      minSimilarityScore: 0.01,
      maxK: 1,
    }
  );

  const retriever = new ParentDocumentRetriever({
    vectorstore,
    byteStore,
    childDocumentRetriever,
    parentSplitter: new RecursiveCharacterTextSplitter({
      chunkOverlap: 0,
      chunkSize: 500,
    }),
    childSplitter: new RecursiveCharacterTextSplitter({
      chunkOverlap: 0,
      chunkSize: 50,
    }),
    childK: 20,
    parentK: 5,
  });

  const textLoader = new TextLoader("./state_of_the_union.txt");
  const parentDocuments = await textLoader.load();
  await retriever.addDocuments(parentDocuments);

  const retrievedDocs = await retriever.invoke("justice breyer");
  console.log(retrievedDocs);
})();
