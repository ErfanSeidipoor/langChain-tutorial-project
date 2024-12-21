import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const joke = z.object({
  setup: z.string().describe("The setup of the joke"),
  punchline: z.string().describe("the punchline to the joke"),
  rating: z.number().optional().describe("How funny the joke is, from 1 to 10"),
});

const structuredLLm = model.withStructuredOutput(joke);

const run = async () => {
  const response = await structuredLLm.invoke("Tell me a joke about cats");

  console.log({ response });
};

run();
