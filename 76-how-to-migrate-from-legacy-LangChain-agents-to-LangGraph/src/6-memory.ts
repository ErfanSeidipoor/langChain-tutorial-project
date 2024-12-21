import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";

import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { z } from "zod";

(async function () {
  const llm = new ChatOllama({ model: "llama3.2", temperature: 0 });

  const magicTool = tool(
    async ({ input }: { input: string }) => {
      return `${Number(input) + 2}`;
    },
    {
      name: "magic_function",
      description: "Applies a magic function to an input.",
      schema: z.object({
        input: z.string(),
      }),
    }
  );

  const tools = [magicTool];

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant"],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
  ]);

  const agent = createToolCallingAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  const memory = new ChatMessageHistory();

  const agentExecutorWithMemory = new RunnableWithMessageHistory({
    runnable: agentExecutor,
    getMessageHistory: () => memory,
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
  });

  const config = { configurable: { sessionId: "test-session" } };

  let agentOutput = await agentExecutorWithMemory.invoke(
    { input: "Hi, I'm polly! What's the output of magic_function of 3?" },
    config
  );

  console.log(agentOutput.output);

  agentOutput = await agentExecutorWithMemory.invoke(
    { input: "Remember my name?" },
    config
  );

  console.log(agentOutput.output);

  agentOutput = await agentExecutorWithMemory.invoke(
    { input: "what was that output again?" },
    config
  );

  console.log(agentOutput.output);
})();
