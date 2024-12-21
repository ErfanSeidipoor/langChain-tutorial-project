import { ChatOpenAI } from "@langchain/openai";

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const llmWithTools = llm.bind({
  tools: [
    {
      type: "function",
      function: {
        name: "calculator",
        description: "Can perform mathematical operations.",
        parameters: {
          type: "object",
          properties: {
            operation: {
              type: "string",
              description: "The type of operation to execute.",
              enum: ["add", "subtract", "multiply", "divide"],
            },
            number1: { type: "number", description: "First integer" },
            number2: { type: "number", description: "Second integer" },
          },
          required: ["number1", "number2"],
        },
      },
    },
  ],
});

const run = async () => {
  const response1 = await llmWithTools.invoke("What is 3 * 12 ?");

  console.log({ response1 });
};

run();
