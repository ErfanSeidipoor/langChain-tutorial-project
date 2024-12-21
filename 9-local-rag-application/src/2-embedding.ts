import "cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const run = async () => {
  const loader = new CheerioWebBaseLoader(
    "https://lilianweng.github.io/posts/2023-06-23-agent/"
  );
  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });

  const allSplits = await textSplitter.splitDocuments(docs);
  console.log(allSplits.length);

  const embeddings = new OllamaEmbeddings({ model: "llama3.2" });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    allSplits,
    embeddings
  );

  const question = "What are the approaches to Task Decomposition?";
  const similaritySearchDocs = await vectorStore.similaritySearch(question);
  console.log(similaritySearchDocs.length);

  console.log(JSON.stringify(similaritySearchDocs, undefined, 2));
};

run();
