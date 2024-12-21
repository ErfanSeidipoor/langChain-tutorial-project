import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const structuredLLm = model.withStructuredOutput({
  name: "joke",
  description: "Joke to tell user",
  parameters: {
    title: "Joke",
    type: "object",
    properties: {
      setup: { type: "string", description: "The setup for the joke" },
      punchline: { type: "string", description: "The Joke's punchline" },
    },
    required: ["setup", "punchline"],
  },
});

const run = async () => {
  const response = await structuredLLm.invoke("Tell me a joke about cats");

  console.log({ response });
};

run();
