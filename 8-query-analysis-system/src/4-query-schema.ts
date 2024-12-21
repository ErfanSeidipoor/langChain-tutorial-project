import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnableLambda,
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { retrieval } from "./3-retrieve-documents";

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const searchSchema = z
  .object({
    query: z
      .string()
      .describe("Similarity Search Query applied to video transcript."),
    publish_year: z.number().optional().describe("Year of video publication."),
  })
  .describe(
    "Search over a database of tutorial videos about a software library."
  );

const structuredLLM = llm.withStructuredOutput(searchSchema, {
  name: "search",
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `you are an expert at converting user questions into database queries. You have access to database of tutorial videos about a software library for building LLM-powered applications. Given a question, return a list of database queries optimized to retrieve the  most relevant results.
        
        if there are acronyms or words you are not familiar with, do not try to rephrase them.
        `,
  ],
  ["human", "{question}"],
]);

const queryAnalyzer = RunnableSequence.from([
  {
    question: new RunnablePassthrough(),
  },
  prompt,
  structuredLLM,
]);

const retrievalChain = queryAnalyzer.pipe(
  new RunnableLambda({
    func: async (input: { query: string; publish_year?: number }) =>
      retrieval(input),
  })
);

const run = async () => {
  console.log(await queryAnalyzer.invoke("How do I build a rag agent"));

  console.log(await queryAnalyzer.invoke("videos on RAG published in 2023"));

  const results = await retrievalChain.invoke({
    question: "RAG tutorial published in 2023",
  });
  console.log(results);

  for (const doc of results) {
    console.log(doc.metadata.title);
    console.log(doc.metadata.publish_year);
  }
};

run();
