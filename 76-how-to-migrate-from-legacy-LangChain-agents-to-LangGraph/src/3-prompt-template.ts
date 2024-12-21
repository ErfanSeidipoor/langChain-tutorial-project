import { ChatPromptTemplate } from "@langchain/core/prompts";
import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
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

  const spanishPrompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant. Respond only in Spanish."],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
  ]);

  const agent = createToolCallingAgent({
    llm,
    tools,
    prompt: spanishPrompt,
  });

  const spanishAgentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  const query = "what is the value of magic_function(3)?";
  const response = await spanishAgentExecutor.invoke({ input: query });

  console.log({ response });
})();
