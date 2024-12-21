import { ChatPromptTemplate } from "@langchain/core/prompts";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

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

  const chunks = [];

  for await (const chunk of await retriever.stream(
    "What is the powerhouse of the cell?"
  )) {
    console.log(chunk);
    chunks.push(chunk);
  }

  console.log(chunks);
};

run();
