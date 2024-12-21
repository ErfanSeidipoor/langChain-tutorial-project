import { z } from "zod";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const personSchema = z.object({
  name: z.string().nullable().describe("The name of the person"),
  hair_color: z.string().nullable().describe("The hair color of the person"),
  height_in_meters: z.string().nullish().describe("Height measured in meters"),
});
// Do not force the LLM to make up information! Above we used .nullish() for the attributes allowing the LLM to output null or undefined if it doesn’t know the answer.

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are an expert extraction algorithm. only extract relevant information from the text. If you do not know the value of an attribute asked to extract, return null for the attribute's value.",
  ],
  ["human", "{input}"],
]);

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const runnable = prompt.pipe(llm.withStructuredOutput(personSchema));

const text = "Alan Smith is 6 feet tall and has blond hair";

const run = async () => {
  const result = await runnable.invoke({ input: text });
  console.log(result);
};

run();
