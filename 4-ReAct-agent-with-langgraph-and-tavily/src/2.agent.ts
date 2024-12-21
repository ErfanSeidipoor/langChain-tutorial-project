import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { HumanMessage } from "@langchain/core/messages";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import fs from "fs";
import { logAgentMessages } from "../libs";

const tools = [new TavilySearchResults({ maxResults: 3 })];
const toolNode = new ToolNode(tools);

const model = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 }).bind(
  toolNode
);

function shouldContinue(state: typeof MessagesAnnotation.State) {
  const lastMessage = state.messages[state.messages.length - 1];

  if (lastMessage.lc_kwargs.tool_calls.length) {
    return "tools";
  }
  return "__end__";
}

async function callModel(state: typeof MessagesAnnotation.State) {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
}

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addEdge("__start__", "agent")
  .addNode("tools", toolNode)
  .addEdge("tools", "agent")
  .addConditionalEdges("agent", shouldContinue);

const app = workflow.compile();

const run = async () => {
  const image = await app.getGraph().drawMermaidPng({});
  const buffer = image.arrayBuffer();
  fs.writeFileSync("./graph2.png", Buffer.from(await buffer));

  const agentFinalState = await app.invoke({
    messages: [new HumanMessage("what is the current weather in sf")],
  });

  logAgentMessages(agentFinalState);
};

run();
