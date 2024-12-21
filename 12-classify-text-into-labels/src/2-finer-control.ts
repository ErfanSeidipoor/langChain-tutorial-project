import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

const taggingPrompt = ChatPromptTemplate.fromTemplate(`
    Extract the desired information form the following passage.
    only extract the properties mentioned in the Classification function.

    Passage:{input}
`);

const classificationSchema = z.object({
  sentiment: z
    .enum(["happy", "neutral", "sad"])
    .describe("The sentiment of the text"),
  aggressiveness: z
    .number()
    .int()
    .min(1)
    .max(5)
    .describe(
      "describe how aggressive the text is, the higher the number the more aggressive"
    ),
  language: z
    .enum(["spanish", "english", "french", "german", "italian"])
    .describe("The language the text is written in"),
});

const llm = new ChatOpenAI({
  temperature: 0,
  model: "gpt-3.5-turbo",
});

const llmWithStructuredOutput = llm.withStructuredOutput(classificationSchema, {
  name: "extractor",
});

const taggingChain = taggingPrompt.pipe(llmWithStructuredOutput);

const input1 =
  "Estoy increiblemente contento de haberte conocido! Creo que seremos muy buenos amigos!";

const input2 = "Estoy muy enojado con vos! Te voy a dar tu merecido!";

const input3 =
  "Weather is ok here, I can go outside without much more than a coat";
const run = async () => {
  const response1 = await taggingChain.invoke({ input: input1 });
  console.log({ response1 });

  const response2 = await taggingChain.invoke({ input: input2 });
  console.log({ response2 });

  const response3 = await taggingChain.invoke({ input: input3 });
  console.log({ response3 });
};

run();
