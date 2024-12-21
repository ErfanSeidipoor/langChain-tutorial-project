import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { InMemoryStore } from "@langchain/core/stores";
import { OllamaEmbeddings } from "@langchain/ollama";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ParentDocumentRetriever } from "langchain/retrievers/parent_document";

(async function () {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 0,
  });

  const jimDocs = await splitter.createDocuments([
    `My favorite color is blue.`,
  ]);
  const jimChunkHeaderOptions = {
    chunkHeader: "DOC NAME: Jim Interview\n---\n",
    appendChunkOverlapHeader: true,
  };

  const pamDocs = await splitter.createDocuments([`My favorite color is red.`]);
  const pamChunkHeaderOptions = {
    chunkHeader: "DOC NAME: Pam Interview\n---\n",
    appendChunkOverlapHeader: true,
  };

  const vectorstore = await HNSWLib.fromDocuments([], new OllamaEmbeddings());
  const byteStore = new InMemoryStore<Uint8Array>();

  const retriever = new ParentDocumentRetriever({
    vectorstore,
    byteStore,
    childSplitter: new RecursiveCharacterTextSplitter({
      chunkSize: 10,
      chunkOverlap: 0,
    }),
    childK: 50,
    parentK: 5,
  });

  await retriever.addDocuments(jimDocs, {
    childDocChunkHeaderOptions: jimChunkHeaderOptions,
  });
  await retriever.addDocuments(pamDocs, {
    childDocChunkHeaderOptions: pamChunkHeaderOptions,
  });
  const retrievedDocs = await retriever.invoke("What is Pam's favorite color?");

  console.log(JSON.stringify(retrievedDocs, null, 2));

  const rawDocs = await vectorstore.similaritySearch(
    "What is Pam's favorite color?"
  );

  console.log(JSON.stringify(rawDocs, null, 2));
})();
