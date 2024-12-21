import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const prompt = PromptTemplate.fromTemplate(`
  Return a JSON object containing the following value wrapped in a "input" key. do not return anythings else:\n {input}`);

const badModel = new ChatOpenAI({
  model: "gpt-3.5-turbo-instruct",
});

const goodModel = new ChatOpenAI({
  model: "gpt-4",
});

const outputParser = StructuredOutputParser.fromZodSchema(
  z.object({
    input: z.string(),
  })
);

const badChain = prompt.pipe(badModel).pipe(outputParser);
const goodChain = prompt.pipe(goodModel).pipe(outputParser);
const chain = badChain.withFallbacks([goodChain]);

const run = async () => {
  try {
    const result = await badChain.invoke({
      input: "testing0",
    });
    console.log({ result });
  } catch (error) {
    console.log("error >", error);
  }

  const result = await chain.invoke({ input: "testing1" });
  console.log({ result });
};

run();
