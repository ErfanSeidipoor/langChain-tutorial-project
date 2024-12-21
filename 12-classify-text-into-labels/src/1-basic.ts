import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

const taggingPrompt = ChatPromptTemplate.fromTemplate(`
    Extract the desired information form the following passage.
    only extract the properties mentioned in the Classification function.

    Passage:{input}
`);

const classificationSchema = z.object({
  sentiment: z.string().describe("The sentiment of the Text"),
  aggressiveness: z
    .number()
    .int()
    .min(1)
    .max(10)
    .describe("How aggressive the text is on a scale form 1 to 10"),
  language: z.string().describe("The language of the text"),
});

const llm = new ChatOpenAI({
  temperature: 0,
  model: "gpt-3.5-turbo",
});

const llmWithStructuredOutput = llm.withStructuredOutput(classificationSchema, {
  name: "extractor",
});

const taggingChain = taggingPrompt.pipe(llmWithStructuredOutput);

const input =
  "Estoy increiblemente contento de haberte conocido! Creo que seremos muy buenos amigos!";

const run = async () => {
  const response = await taggingChain.invoke({ input });
  console.log({ response });
};

run();
