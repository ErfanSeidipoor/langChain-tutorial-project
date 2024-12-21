import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";
import { LLMChainExtractor } from "langchain/retrievers/document_compressors/chain_extract";
import * as fs from "fs";

(async function () {
  const model = new ChatOllama({
    model: "llama3.2",
  });

  const baseCompressor = LLMChainExtractor.fromLLM(model);

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
    "Whats did the speaker say about Justice Breyer?"
  );

  console.log(retrievedDocs);
})();
