import { ChatOllama } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

(async function () {
  //   const llm = new ChatOllama({
  //     model: "llama3.2",
  //     temperature: 0.7,
  //   });

  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.7,
  });

  const JokeSchema = z
    .object({
      setup: z.string().describe("The setup of the joke"),
      punchline: z.string().describe("The punchline of the joke"),
      rating: z
        .number()
        .optional()
        .describe("Ho funny the joke is, from 1 to 10"),
    })
    .describe("A joke");

  const structuredLmm = llm.withStructuredOutput(JokeSchema, {
    name: "joke",
    // includeRaw: true
    method: "jsonMode",
  });

  const response = await structuredLmm.invoke(
    "Tell me a joke, respond in JSON with `setup` and `punchline` keys"
  );

  console.log({ response });
})();
