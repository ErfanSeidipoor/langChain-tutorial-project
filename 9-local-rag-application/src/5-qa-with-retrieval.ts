import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { pull } from "langchain/hub";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { formatDocumentsAsString } from "langchain/util/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const loader = new CheerioWebBaseLoader(
  "https://lilianweng.github.io/posts/2023-06-23-agent/"
);

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});

const embeddings = new OllamaEmbeddings({ model: "llama3.2" });

const ollamaLlm = new ChatOllama({
  model: "llama3.2",
});

const question = "Whats are the approaches to Task Decomposition ?";

const run = async () => {
  // const ragPrompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");
  const ragPrompt = ChatPromptTemplate.fromTemplate(
    `
    You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
      Question: {question} 
      Context: {context} 
      Answer:
    `
  );

  const docs = await loader.load();
  const allSplits = await textSplitter.splitDocuments(docs);
  console.log(allSplits.length);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    allSplits,
    embeddings
  );

  const retriever = vectorStore.asRetriever();
  const qaChain = RunnableSequence.from([
    {
      context: (input: { question: string }, callbacks) => {
        return retriever
          .pipe(formatDocumentsAsString)
          .invoke(input.question, callbacks);
      },
      question: new RunnablePassthrough(),
    },
    ragPrompt,
    ollamaLlm,
    new StringOutputParser(),
  ]);

  const response = await qaChain.invoke({
    question,
  });

  console.log(response);
};

run();
