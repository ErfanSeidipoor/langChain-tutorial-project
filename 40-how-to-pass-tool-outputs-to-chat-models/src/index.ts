import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";
import { HumanMessage } from "@langchain/core/messages";
import { logAgentMessages } from "./libs";

(async function () {
  const addTool = tool(
    async ({ a, b }) => {
      return a + b;
    },
    {
      name: "add",
      schema: z.object({
        a: z.number(),
        b: z.number(),
      }),
      description: "adds a and b",
    }
  );

  const multiplyTool = tool(
    async ({ a, b }) => {
      return a * b;
    },
    {
      name: "multiply",
      schema: z.object({
        a: z.number(),
        b: z.number(),
      }),
      description: "Multiplies a and b.",
    }
  );

  const tools = [addTool, multiplyTool];

  const llm = new ChatOllama({
    model: "llama3.2",
  });

  const llmWithTools = llm.bindTools(tools);

  const messages = [
    new HumanMessage("What is 3 * 12 ? Also, what is 11 + 49 ?"),
  ];

  const aiMessage = await llmWithTools.invoke(messages);
  console.log(aiMessage.content);

  messages.push(aiMessage);

  const toolsByName = {
    add: addTool,
    multiply: multiplyTool,
  };

  if (aiMessage.tool_calls) {
    for (const toolCall of aiMessage.tool_calls) {
      const selectedTool =
        toolsByName[toolCall.name as keyof typeof toolsByName];
      const toolMessage = await selectedTool.invoke(toolCall);
      messages.push(toolMessage);
    }
  }

  console.log(messages);

  logAgentMessages({ messages });

  const finalMessage = await llmWithTools.invoke(messages);

  messages.push(finalMessage);

  logAgentMessages({ messages });
})();
