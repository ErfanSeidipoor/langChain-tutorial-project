import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import fs from "fs";
import { logAgentMessages } from "../libs";

const agentTools = [new TavilySearchResults({ maxResults: 3 })];
const agentModel = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });

const agentCheckpointer = new MemorySaver();

const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointSaver: agentCheckpointer,
});

const run = async () => {
  const image = await agent.getGraph().drawMermaidPng({});
  const buffer = image.arrayBuffer();

  fs.writeFileSync("./graph1.png", Buffer.from(await buffer));

  const agentFinalState = await agent.invoke(
    { messages: [new HumanMessage("what is the current weather in sf")] },
    { configurable: { thread_id: "42" } }
  );

  console.dir(agentFinalState, { depth: null });

  logAgentMessages(agentFinalState);

  const agentNextState = await agent.invoke(
    { messages: [new HumanMessage("what about ny")] },
    { configurable: { thread_id: "42" } }
  );

  logAgentMessages(agentNextState);
};

run();
