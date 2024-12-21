import { ChatOpenAI } from "@langchain/openai";
import { logAgentMessages } from "./libs";

(async function () {
  const model = new ChatOpenAI({
    model: "gpt-4o",
  });

  const modelWithTools = model.bind({
    tools: [
      {
        type: "function",
        function: {
          name: "calculator",
          description: "Can perform mathematical operations",
          parameters: {
            type: "object",
            properties: {
              operation: {
                type: "string",
                enum: ["add", "subtract", "multiply", "divide"],
                description: "the type of the operation to execute.",
              },
              number1: {
                type: "number",
                description: "The first number to operate on.",
              },
              number2: {
                type: "number",
                description: "The second number to operate on.",
              },
            },
          },
          require: ["number1", "number2"],
        },
      },
    ],
  });

  const response1 = await modelWithTools.invoke("What is 4 * 7");

  console.log(response1);

  logAgentMessages({ messages: [response1] });

  const response2 = await modelWithTools.invoke(
    "What is 3 * 12? Also, what is 11 + 49?"
  );

  console.log(response2);

  logAgentMessages({ messages: [response2] });
})();
