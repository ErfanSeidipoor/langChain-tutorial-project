import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OllamaEmbeddings } from "@langchain/ollama";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import * as fs from "fs";
import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";
import { EmbeddingsFilter } from "langchain/retrievers/document_compressors/embeddings_filter";

(async function () {
  const baseCompressor = new EmbeddingsFilter({
    embeddings: new OllamaEmbeddings(),
    similarityThreshold: 0.4,
  });

  const text = fs.readFileSync("./state_of_the_union.txt", "utf-8");

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
  });

  const docs = await textSplitter.createDocuments([text]);
  const vectorstore = await HNSWLib.fromDocuments(docs, new OllamaEmbeddings());

  const retriever = new ContextualCompressionRetriever({
    baseCompressor,
    baseRetriever: vectorstore.asRetriever(),
  });

  const retrievedDocs = await retriever.invoke(
    "What did the speaker say about Justice Breyer?"
  );

  console.log(retrievedDocs);
})();
