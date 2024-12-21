import { ChatOllama } from "@langchain/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
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

const prompt = PromptTemplate.fromTemplate(
  "Summarize the main themes in these retrieved docs: {context}"
);

const question = "Whats are the approaches to Task Decomposition ?";

const run = async () => {
  const docs = await loader.load();
  const allSplits = await textSplitter.splitDocuments(docs);
  console.log(allSplits.length);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    allSplits,
    embeddings
  );

  const chain = await createStuffDocumentsChain({
    llm: ollamaLlm,
    outputParser: new StringOutputParser(),
    prompt,
  });

  const docs_result = await vectorStore.similaritySearch(question);

  const response = await chain.invoke({
    context: docs_result,
  });

  console.log(response);
};

run();
