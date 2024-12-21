import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, AIMessage, ToolMessage } from "@langchain/core/messages";

(async function () {
  const llm = new ChatOllama({
    model: "llama3.2",
  });

  const calculatorSchema = z.object({
    operation: z
      .enum(["add", "subtract", "multiply", "divide"])
      .describe("The type of operation to execute."),
    number1: z.number().describe("The first number to operate on."),
    number2: z.number().describe("The second number to operate on."),
  });

  const calculatorTool = tool(
    async ({ operation, number1, number2 }) => {
      // Functions must return strings
      if (operation === "add") {
        return `${number1 + number2}`;
      } else if (operation === "subtract") {
        return `${number1 - number2}`;
      } else if (operation === "multiply") {
        return `${number1 * number2}`;
      } else if (operation === "divide") {
        return `${number1 / number2}`;
      } else {
        throw new Error("Invalid operation.");
      }
    },
    {
      name: "calculator",
      description: "Can perform mathematical operations.",
      schema: calculatorSchema,
    }
  );

  const llmWithTools = llm.bindTools([calculatorTool]);

  const response1 = await llmWithTools.invoke("What is 3 🦜 12");

  console.log(response1.content);
  console.log(response1.tool_calls);

  const response2 = await llmWithTools.invoke([
    new HumanMessage("What is 333382 🦜 1932?"),
    new AIMessage({
      content:
        "The 🦜 operator is shorthand for division, so we call the divide tool.",
      tool_calls: [
        {
          id: "1123123",
          name: "calculator",
          args: {
            number1: 333382,
            number2: 1932,
            operation: "divide",
          },
        },
      ],
    }),
    new ToolMessage({
      tool_call_id: "1123123",
      content: "The answer is 172.558.",
    }),
    new AIMessage("The answer is 172.558."),

    new HumanMessage("What is 6 🦜 2?"),
    new AIMessage({
      content:
        "The 🦜 operator is shorthand for division, so we call the divide tool.",
      tool_calls: [
        {
          id: "54321",
          name: "calculator",
          args: {
            number1: 6,
            number2: 2,
            operation: "divide",
          },
        },
      ],
    }),
    new ToolMessage({
      tool_call_id: "54321",
      content: "The answer is 3.",
    }),
    new AIMessage("The answer is 3."),
    new HumanMessage("What is 3 🦜 12?"),
  ]);

  console.log(response2.tool_calls);
})();
