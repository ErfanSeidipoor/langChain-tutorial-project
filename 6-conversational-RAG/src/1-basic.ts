import { ChatOpenAI } from "@langchain/openai";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import fs from "fs";

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const loader = new CheerioWebBaseLoader(
  "https://lilianweng.github.io/posts/2023-06-23-agent/",
  {
    selector: ".post-content, .post-title, .post-header",
  }
);

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const systemPrompt =
  "You are an assistant for question-answering task. " +
  "Use the following piece of retrieved context to answer the question." +
  "if you don't know the answer, say that you don't know. Use three sentences maximum and keep the answer concise" +
  "\n\n" +
  "{context}";

const prompt = ChatPromptTemplate.fromMessages<{
  context: string;
  input: string;
}>([
  ["system", systemPrompt],
  ["human", "{input}"],
]);

const run = async () => {
  const docs = await loader.load();
  const splits = await textSplitter.splitDocuments(docs);
  const vectorstore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings()
  );

  const retriever = vectorstore.asRetriever();

  const questionAnswerChain = await createStuffDocumentsChain({
    llm,
    prompt,
  });

  const ragChain = await createRetrievalChain({
    retriever,
    combineDocsChain: questionAnswerChain,
  });

  const image = await ragChain.getGraph().drawMermaidPng({});
  const buffer = image.arrayBuffer();

  fs.writeFileSync("./graph1.png", Buffer.from(await buffer));

  const response = await ragChain.invoke({
    input: "What is task Decomposition ?",
  });

  console.dir({ response }, { depth: true });
};

run();
