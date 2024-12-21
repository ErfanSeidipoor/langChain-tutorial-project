import "peggy";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings, OpenAI } from "@langchain/openai";
import { FunctionalTranslator } from "@langchain/core/structured_query";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { SelfQueryRetriever } from "langchain/retrievers/self_query";
import type { AttributeInfo } from "langchain/chains/query_constructor";

const docs = [
  new Document({
    pageContent:
      "A bunch of scientists bring back dinosaurs and mayhem breaks loose",
    metadata: {
      year: 1993,
      rating: 7.7,
      genre: "science fiction",
      length: 122,
    },
  }),
  new Document({
    pageContent:
      "Leo DiCaprio gets lost in a dream within a dream within a dream within a ...",
    metadata: {
      year: 2010,
      director: "Christopher Nolan",
      rating: 8.2,
      length: 148,
    },
  }),
  new Document({
    pageContent:
      "A psychologist / detective gets lost in a series of dreams within dreams within dreams and Inception reused the idea",
    metadata: { year: 2006, director: "Satoshi Kon", rating: 8.6 },
  }),
  new Document({
    pageContent:
      "A bunch of normal-sized women are supremely wholesome and some men pine after them",
    metadata: {
      year: 2019,
      director: "Greta Gerwig",
      rating: 8.3,
      length: 135,
    },
  }),
  new Document({
    pageContent: "Toys come alive and have a blast doing so",
    metadata: { year: 1995, genre: "animated", length: 77 },
  }),
  new Document({
    pageContent: "Three men walk into the Zone, three men walk out of the Zone",
    metadata: {
      year: 1979,
      director: "Andrei Tarkovsky",
      genre: "science fiction",
      rating: 9.9,
    },
  }),
];

const attributeInfo: AttributeInfo[] = [
  {
    name: "genre",
    description: "The genre of the movie",
    type: "string or array of strings",
  },
  {
    name: "year",
    description: "The year the movie was released",
    type: "number",
  },
  {
    name: "director",
    description: "The director of the movie",
    type: "string",
  },
  {
    name: "rating",
    description: "The rating of the movie (1-10)",
    type: "number",
  },
  {
    name: "length",
    description: "The length of the movie in minutes",
    type: "number",
  },
];

(async function () {
  const embeddings = new OpenAIEmbeddings();
  const llm = new OpenAI();
  const documentContents = "Brief summary of a movie";
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const selfQueryRetriever = SelfQueryRetriever.fromLLM({
    llm,
    vectorStore,
    documentContents,
    attributeInfo,
    /**
     * We need to use a translator that translates the queries into a
     * filter format that the vector store can understand. We provide a basic translator
     * translator here, but you can create your own translator by extending BaseTranslator
     * abstract class. Note that the vector store needs to support filtering on the metadata
     * attributes you want to query on.
     */
    structuredQueryTranslator: new FunctionalTranslator(),
  });

  const question1 = "Which movies are less than 90 minutes?";
  const response1 = await selfQueryRetriever.invoke(question1);
  console.log({ response1, question1 });

  const question2 = "Which movies are rated higher than 8.5?";
  const response2 = await selfQueryRetriever.invoke(question2);
  console.log({ response2, question2 });

  const question3 = "Which movies are directed by Greta Gerwig?";
  const response3 = await selfQueryRetriever.invoke(question3);
  console.log({ response3, question3 });

  const question4 =
    "Which movies are either comedy or drama and are less than 90 minutes?";
  const response4 = await selfQueryRetriever.invoke(question4);
  console.log({ response4, question4 });
})();
