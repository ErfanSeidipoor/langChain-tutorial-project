import { ChatOllama } from "@langchain/ollama";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { Calculator } from "@langchain/community/tools/calculator";

const tools = [new TavilySearchResults(), new Calculator()];

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant"],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
  ["placeholder", "{agent_scratchpad}"],
]);

const llm = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

const run = async () => {
  const agent = await createToolCallingAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  const result = await agentExecutor.invoke({
    input:
      "Who directed the 2023 film Oppenheimer and what is their age? What is their age in days (assume 365 days per year)?",
  });

  console.log("input: ", result.input);
  console.log("output: ", result.output);
};

run();
