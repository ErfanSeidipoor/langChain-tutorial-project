import {
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOllama } from "@langchain/ollama";

import { z } from "zod";

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

  const modifyMessages = (messages: BaseMessage[]) => {
    return [
      new SystemMessage(
        "You are a helpful assistant. Respond only in Spanish."
      ),
      ...messages,
      new HumanMessage("Also say 'Pandemonium!' after the answer."),
    ];
  };
  const appWithSystemMessage = createReactAgent({
    llm,
    tools,
    messageModifier: modifyMessages,
  });

  const query = "what is the value of magic_function(3)?";
  const agentOutput = await appWithSystemMessage.invoke({
    messages: [{ role: "user", content: query }],
  });

  console.log({ agentOutput });
})();
