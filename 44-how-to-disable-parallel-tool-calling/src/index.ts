import { ChatOpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/ollama";
import { z } from "zod";
import { tool } from "@langchain/core/tools";

(async function () {
  const adderTool = tool(
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

  const multiplyTool = tool(
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

  const tools = [adderTool, multiplyTool];

  // const llm = new ChatOllama({
  //   model: "llama3.2",
  // });

  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
  });

  const llmWithTools = llm.bindTools(tools);

  const result1 = await llmWithTools.invoke(
    "Please call the first tool two times"
  );

  console.log(result1.tool_calls);
  console.log(result1.tool_calls?.length);

  const result2 = await llmWithTools.invoke(
    "Please call the first tool two times",
    {
      parallel_tool_calls: false,
    }
  );

  console.log(result2.tool_calls);
  console.log(result2.tool_calls?.length);
})();
