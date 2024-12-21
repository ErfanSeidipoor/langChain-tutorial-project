import { OpenAIEmbeddings } from "@langchain/openai";

(async function () {
  const embeddings = new OpenAIEmbeddings({});

  const response = await embeddings.embedQuery("Hello, world!");

  console.log({ dimension: response.length, response });

  const documentRes = await embeddings.embedDocuments([
    "Hello world",
    "Bye bye",
  ]);

  console.log({ dimension: documentRes.length, documentRes });
})();
