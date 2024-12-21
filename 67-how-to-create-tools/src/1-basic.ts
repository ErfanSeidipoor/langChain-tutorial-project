import { tool } from "@langchain/core/tools";
import { z } from "zod";

const adderTool = tool(
  async (input): Promise<string> => {
    const sum = input.a + input.b;
    return `The sum of ${input.a} and ${input.b} is ${sum}`;
  },
  {
    name: "adder",
    description: "Add two numbers together",
    schema: z.object({
      a: z.number().describe("The first number to add"),
      b: z.number().describe("The second number to add"),
    }),
  }
);

(async function () {
  const response = await adderTool.invoke({ a: 1, b: 2 });

  console.log({ response });
})();
