import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });

export const retrieval = async (input: {
  query: string;
  publish_year?: number;
}) => {
  const vectorStore = await Chroma.fromExistingCollection(embeddings, {
    collectionName: "yt-videos-2",
  });

  let _filter: Record<string, any> = {};

  if (input.publish_year) {
    _filter = {
      publish_year: { $eq: input.publish_year },
    };
  }

  const searchResults = await vectorStore.similaritySearch(
    "videos on RAG published in 2024",
    undefined,
    _filter
  );

  for (const result of searchResults) {
    // console.log(result.metadata.title)
    // console.log(result.metadata.publish_year)
    // console.log(result.pageContent.slice(0, 500))
  }

  return searchResults;
};

retrieval({ query: "videos on RAG published in 2024", publish_year: 2024 });
