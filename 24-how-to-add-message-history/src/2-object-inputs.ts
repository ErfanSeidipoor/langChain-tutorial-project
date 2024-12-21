import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

import {
  Annotation,
  END,
  MemorySaver,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";
import { randomUUID } from "crypto";

const GraphAnnotation = Annotation.Root({
  language: Annotation<string>(),
  ...MessagesAnnotation.spec,
});

const llm = new ChatOllama({
  model: "llama3.2",
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "Answer in {language}"],
  new MessagesPlaceholder("messages"),
]);

const runnable = prompt.pipe(llm);

const callModel = async (state: typeof GraphAnnotation.State) => {
  const response = await runnable.invoke(state);
  return { messages: [response] };
};

const workflow = new StateGraph(GraphAnnotation)
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

const app = workflow.compile({ checkpointer: new MemorySaver() });

const run = async () => {
  const config = { configurable: { thread_id: randomUUID() } };

  const input = {
    messages: [
      {
        role: "user",
        content: "Whats my name?",
      },
    ],
    language: "Spanish",
  };

  const response = await app.invoke(input, config);

  console.log(response);
};

run();
