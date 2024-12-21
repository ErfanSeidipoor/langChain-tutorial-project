import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import type { Document } from "@langchain/core/documents";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { ChatPromptTemplate } from "@langchain/core/prompts";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0.6,
});

const fromDocument = (document: Document[]) => {
  return document.map((doc) => doc.pageContent).join("\n");
};

const template = `
    Answer the question based only on the following context: {context}

    Question: {question}
`;

const prompt = ChatPromptTemplate.fromTemplate(template);

const run = async () => {
  const vectorStore = await MemoryVectorStore.fromTexts(
    [
      "mitochondria is the powerhouse of the cell",
      "buildings are made of brick",
    ],
    [{}, {}],
    new OpenAIEmbeddings()
  );
  const retriever = vectorStore.asRetriever();

  const retrievalChain = RunnableSequence.from([
    {
      context: retriever.pipe(fromDocument),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const chunks = [];

  for await (const chunk of await retrievalChain.stream(
    "What is the powerhouse of the cell?"
  )) {
    process.stdout.write(chunk);
    console.log("");

    chunks.push(chunk);
  }

  console.log(chunks);
};

run();
