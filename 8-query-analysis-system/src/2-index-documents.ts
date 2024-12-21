import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getDocs } from "./1-load-documents";

const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });

const indexing = async () => {
  const docs = await getDocs();
  const chunkedDocs = await textSplitter.splitDocuments(docs);

  const vectorStore = await Chroma.fromDocuments(chunkedDocs, embeddings, {
    collectionName: "yt-videos-2",
  });
  console.log("Vector store created");
};

indexing();
