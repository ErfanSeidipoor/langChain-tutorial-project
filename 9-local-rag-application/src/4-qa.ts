import { ChatOllama } from "@langchain/ollama";
import { pull } from "langchain/hub";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";

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
  const ragPrompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");

  console.log("ragPrompt", ragPrompt.promptMessages);

  const chain = await createStuffDocumentsChain({
    llm: ollamaLlm,
    outputParser: new StringOutputParser(),
    prompt: ragPrompt,
  });

  const docs = await loader.load();
  const allSplits = await textSplitter.splitDocuments(docs);
  console.log(allSplits.length);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    allSplits,
    embeddings
  );

  const docs_result = await vectorStore.similaritySearch(question);

  const response = await chain.invoke({
    context: docs_result,
    question,
  });

  console.log(response);
};

run();
