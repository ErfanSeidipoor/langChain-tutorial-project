import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";
import { concat } from "@langchain/core/utils/stream";

(async function () {
  const addTool = tool(
    async (input) => {
      return input.a + input.b;
    },
    {
      name: "add",
      description: "Adds a and b.",
      schema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    }
  );

  const multiplyTool = tool(
    async (input) => {
      return input.a * input.b;
    },
    {
      name: "multiply",
      description: "Multiplies a and b.",
      schema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    }
  );

  const tools = [addTool, multiplyTool];

  // const model = new ChatOllama({
  //   model: "llama3.2",
  //   temperature: 0,
  // });

  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  const modelWithTools = model.bindTools(tools);

  const query = "What is 3 * 12? Also, what is 11 + 49?";

  const stream = await modelWithTools.stream(query);

  let gathered = undefined;

  for await (const chunk of stream) {
    gathered = gathered !== undefined ? concat(gathered, chunk) : chunk;

    process.stdout.write(chunk.content.toString());

    let content = "";
    if (chunk.tool_call_chunks) {
      if (chunk.tool_call_chunks[0]) {
        content = chunk.tool_call_chunks[0].args || "";
      }
    }

    process.stdout.write(content);
  }
  console.log("\n");

  // console.log({ gathered });
})();
