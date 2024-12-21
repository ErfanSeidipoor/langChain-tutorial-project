import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

const multiplyTool = new DynamicStructuredTool({
  name: "multiply",
  description: "Multiply two numbers together",
  schema: z.object({
    a: z.number().describe("The first number to multiply"),
    b: z.number().describe("The second number to multiply"),
  }),
  func: async (input): Promise<string> => {
    const product = input.a * input.b;
    return `The product of ${input.a} and ${input.b} is ${product}`;
  },
});

(async function () {
  const response = await multiplyTool.invoke({ a: 3, b: 4 });

  console.log({ response });
})();
