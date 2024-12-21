import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOllama } from "@langchain/ollama";
import { z } from "zod";
import { logAgentMessages } from "./libs";

(async function () {
  const llm = new ChatOllama({ model: "llama3.2", temperature: 0 });
  // const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });

  const magicTool = tool(
    async ({ input }: { input: number }) => {
      return `${input + 2}`;
    },
    {
      name: "magic_function",
      description: "Applies a magic function to an input.",
      schema: z.object({
        input: z.number(),
      }),
    }
  );

  const tools = [magicTool];

  const app = createReactAgent({
    llm,
    tools,
  });

  const query = "what is the value of magic_function(3)?";

  let agentOutput = await app.invoke({
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
  });
  {
    const { messages } = agentOutput;
    logAgentMessages({ messages });
  }

  //   console.log({ agentOutput });

  const messageHistory = agentOutput.messages;
  const newQuery = "Pardon?";

  agentOutput = await app.invoke({
    messages: [...messageHistory, { role: "user", content: newQuery }],
  });

  logAgentMessages({ messages: agentOutput.messages });
})();
