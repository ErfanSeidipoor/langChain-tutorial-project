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

  const structuredLmm = llm.withStructuredOutput(JokeSchema);

  const response = await structuredLmm.invoke("Tell me a joke");

  console.log({ response });

  const structuredLmm2 = llm.withStructuredOutput({
    name: "joke",
    description: "Joke to tell user",
    parameters: {
      title: "Joke",
      type: "object",
      properties: {
        setup: { type: "string", description: "the setup for the joke" },
        punchline: {
          type: "string",
          description: "the punchline for the joke",
        },
      },
      required: ["setup", "punchline"],
    },
  });

  const response2 = await structuredLmm2.invoke("Tell me a joke about cats");

  console.log({ response2 });
})();
