import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { tool } from "@langchain/core/tools";

(async function () {
  const add = tool(
    async ({ a, b }) => {
      return a + b;
    },
    {
      name: "add",
      description: "Adds a and b",
      schema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    }
  );

  const multiply = tool(
    async ({ a, b }) => {
      return a + b;
    },
    {
      name: "multiply",
      description: "Multiplies a and b",
      schema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    }
  );

  const tools = [add, multiply];

  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  const llmForcedToMultiply = llm.bindTools(tools, {
    tool_choice: "multiply",
  });

  const multiplyResult = await llmForcedToMultiply.invoke("what is 2 + 4");
  console.log("what is 2 + 4");
  console.log(JSON.stringify(multiplyResult.tool_calls, null, 2));

  const llmForceToUserTool = llm.bindTools(tools, {
    tool_choice: "any",
  });

  const anyToolResult = await llmForceToUserTool.invoke("What day is today?");
  console.log("What day is today?");
  console.log(JSON.stringify(anyToolResult.tool_calls, null, 2));
})();
