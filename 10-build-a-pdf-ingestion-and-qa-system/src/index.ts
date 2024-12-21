import "pdf-parse";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const llm = new ChatOllama({
  model: "llama3.2",
});
const loader = new PDFLoader("./nke-10k-2023.pdf");
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const systemTemplate = [
  `You are an assistant for question-answering tasks. `,
  `Use the following pieces of retrieved context to answer `,
  `the question. If you don't know the answer, say that you `,
  `don't know. Use three sentences maximum and keep the `,
  `answer concise.`,
  `\n\n`,
  `{context}`,
].join("");

const prompt = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["human", "{input}"],
]);

const run = async () => {
  const docs = await loader.load();
  const splits = await textSplitter.splitDocuments(docs);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new OllamaEmbeddings({ model: "llama3.2" })
  );

  const retriever = vectorStore.asRetriever();

  const questionAnswerChain = await createStuffDocumentsChain({ llm, prompt });

  const ragChain = await createRetrievalChain({
    retriever,
    combineDocsChain: questionAnswerChain,
  });

  const result = await ragChain.invoke({
    input: "What was Nike's revenue in 2023?",
  });

  console.log({ result });
};
run();
