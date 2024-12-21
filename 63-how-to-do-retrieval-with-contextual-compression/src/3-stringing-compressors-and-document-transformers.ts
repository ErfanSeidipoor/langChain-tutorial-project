import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";
import { EmbeddingsFilter } from "langchain/retrievers/document_compressors/embeddings_filter";
import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import { DocumentCompressorPipeline } from "langchain/retrievers/document_compressors";

(async function () {
  const embeddingsFilter = new EmbeddingsFilter({
    embeddings: new OpenAIEmbeddings(),
    similarityThreshold: 0.8,
    k: 5,
  });

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 0,
  });

  const compressorPipeline = new DocumentCompressorPipeline({
    transformers: [textSplitter, embeddingsFilter],
  });

  const baseRetriever = new TavilySearchAPIRetriever({
    includeRawContent: true,
  });

  const retriever = new ContextualCompressionRetriever({
    baseCompressor: compressorPipeline,
    baseRetriever,
  });

  const retrievedDocs = await retriever.invoke(
    "What did the speaker say about Justice Breyer in the 2022 State of the Union?"
  );
  console.log({ retrievedDocs });
})();
