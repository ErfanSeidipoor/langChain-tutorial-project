import {
  END,
  MemorySaver,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";
import { ChatOllama } from "@langchain/ollama";
import { randomUUID } from "crypto";

const llm = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

const callModel = async (state: typeof MessagesAnnotation.State) => {
  const response = await llm.invoke(state.messages);
  return { messages: response };
};

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });

const config = { configurable: { thread_id: randomUUID() } };
const config2 = { configurable: { thread_id: randomUUID() } };

const input = [
  {
    role: "user",
    content: "Hi! I'm Bob.",
  },
];

const input2 = [
  {
    role: "user",
    content: "What's my name?",
  },
];

const input3 = [
  {
    role: "user",
    content: "What's my name?",
  },
];

const run1 = async () => {
  console.log("run");

  const output = await app.invoke({ messages: input }, config);
  console.log(output.messages[output.messages.length - 1]);

  const output2 = await app.invoke({ messages: input2 }, config);
  console.log(output2.messages[output2.messages.length - 1]);

  const output3 = await app.invoke({ messages: input3 }, config2);
  console.log(output3.messages[output3.messages.length - 1]);
};

run1();
