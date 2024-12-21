import { ChatOllama } from "@langchain/ollama";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { logAgentMessages } from "./libs";

(async function () {
  const llm = new ChatOllama({
    model: "llama3.2",
  });

  const CalculationSchema = z.object({
    operation: z
      .enum(["add", "subtract", "multiply", "divide"])
      .describe("the type of the operation to execute."),
    number1: z.number().describe("THe first number to operate on."),
    number2: z.number().describe("The second number to operate on"),
  });

  const calculationTool = tool(
    async (input: { operation: string; number1: number; number2: number }) => {
      const { number1, number2, operation } = input;
      switch (operation) {
        case "add":
          return `${number1 + number2}`;
        case "subtract":
          return `${number1 - number2}`;
        case "multiply":
          return `${number1 * number2}`;
        case "divide":
          if (number2 === 0) {
            throw new Error("Cannot divide by zero");
          }
          return `${number1 / number2}`;
        default:
          throw new Error("Invalid operation");
      }
    },
    {
      name: "calculator",
      description: "Can perform mathematical operations",
      schema: CalculationSchema,
    }
  );

  const llmWithTools = llm.bindTools([calculationTool]);

  const response1 = await llmWithTools.invoke("What is 4 * 7");

  console.log(response1);

  logAgentMessages({ messages: [response1] });

  const response2 = await llmWithTools.invoke(
    "What is 3 * 12? Also, what is 11 + 49?"
  );

  console.log(response2);

  logAgentMessages({ messages: [response2] });
})();
