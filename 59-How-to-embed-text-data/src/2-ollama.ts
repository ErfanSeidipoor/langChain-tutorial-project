import { OllamaEmbeddings } from "@langchain/ollama";

(async function () {
  const embeddings = new OllamaEmbeddings({});

  const response = await embeddings.embedQuery("Hello, world!");

  console.log({ dimension: response.length, response });
})();
