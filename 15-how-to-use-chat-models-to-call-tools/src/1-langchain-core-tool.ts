import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";
import { z } from "zod";

const llm = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

const calculatorSchema = z.object({
  operation: z
    .enum(["add", "subtract", "multiply", "divide"])
    .describe("The type of operation to execute."),
  number1: z.number().describe("The first number to operate on."),
  number2: z.number().describe("The second number to operate on."),
});

const calculatorFunction = async ({
  operation,
  number1,
  number2,
}: {
  operation: string;
  number1: number;
  number2: number;
}) => {
  if (operation === "add") {
    return number1 + number2;
  } else if (operation === "subtract") {
    return number1 - number2;
  } else if (operation === "multiply") {
    return number1 * number2;
  } else if (operation === "divide") {
    return number1 / number2;
  } else {
    throw new Error("Invalid operation");
  }
};

const calculatorTool = tool(calculatorFunction, {
  name: "calculator",
  description: "Can perform mathematical operations",
  schema: calculatorSchema,
});

const llmWithTools = llm.bindTools([calculatorTool]);

const run = async () => {
  const response1 = await llmWithTools.invoke("What is 3 * 12 ?");
  const toolCalls = response1.tool_calls;

  if (toolCalls) {
    for (const { name, args } of toolCalls) {
      if (name === "calculator") {
        const toolResponse = await calculatorTool.invoke({
          number1: Number(args.number1),
          number2: Number(args.number2),
          operation: args.operation,
        });

        console.log(toolResponse);
      }
    }
  }
};

run();
