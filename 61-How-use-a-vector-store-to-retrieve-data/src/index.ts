import { StringOutputParser } from "@langchain/core/output_parsers";
import type { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import * as fs from "node:fs";

(async function () {
  const formatDocumentAsString = (documents: Document[]) => {
    return documents.map((document) => document.pageContent).join("\n\n");
  };

  const model = new ChatOllama({
    model: "llama3.2",
  });

  const text = await fs.readFileSync("./state_of_the_union.txt", "utf-8");

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
  });

  const docs = await textSplitter.createDocuments([text]);

  const vectorstore = await MemoryVectorStore.fromDocuments(
    docs,
    new OllamaEmbeddings()
  );

  const vectorStoreRetriever = vectorstore.asRetriever();

  const SYSTEM_PROMPT = `
    Use the following pieces of context to answer the question at the end.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    ----------------
    {context}
  `;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_PROMPT],
    ["human", "{question}"],
  ]);

  const chain = RunnableSequence.from([
    {
      context: vectorStoreRetriever.pipe(formatDocumentAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const answer = await chain.invoke(
    "What did the president say about Justice Breyer?"
  );

  console.log({ answer });
})();
