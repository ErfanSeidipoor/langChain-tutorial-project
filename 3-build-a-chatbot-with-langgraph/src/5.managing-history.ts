import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
  Annotation,
} from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { v4 as uuidv4 } from "uuid";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
  trimMessages,
} from "@langchain/core/messages";

console.clear();

const trimmer = trimMessages({
  maxTokens: 10,
  strategy: "last",
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: "human",
});

const messages = [
  new SystemMessage("you're a good assistant"),
  new HumanMessage("hi! I'm bob"),
  new AIMessage("hi!"),
  new HumanMessage("I like vanilla ice cream"),
  new AIMessage("nice"),
  new HumanMessage("whats 2 + 2"),
  new AIMessage("4"),
  new HumanMessage("thanks"),
  new AIMessage("no problem!"),
  new HumanMessage("having fun?"),
  new AIMessage("yes!"),
];

const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  language: Annotation<string>(),
});

const prompt = ChatPromptTemplate.fromMessages<typeof GraphAnnotation.State>([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
  ],
  new MessagesPlaceholder("messages"),
]);

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const callModel = async (state: typeof GraphAnnotation.State) => {
  const chain = prompt.pipe(llm);
  const response = await chain.invoke({
    messages: await trimmer.invoke(state.messages),
    language: state.language,
  });
  return { messages: [response] };
};

// Define a new graph
const workflow = new StateGraph(GraphAnnotation)
  // Define node
  .addNode("model", callModel)
  // Define Edge
  .addEdge(START, "model")
  .addEdge("model", END);

const app = workflow.compile({ checkpointer: new MemorySaver() });

const config = { configurable: { thread_id: uuidv4() } };

const run = async () => {
  /* --------------------------------- input1 --------------------------------- */
  const input1 = {
    messages: [...messages, new HumanMessage("What is my name?")],
    language: "English",
  };

  const output1 = await app.invoke(input1, config);
  // console.dir({ output1 }, { depth: null });
  console.log("\n output1 >");
  for (const message of output1.messages) {
    console.log(message.content);
  }

  const input2 = [
    {
      role: "user",
      content: "What math problem did I ask?",
    },
  ];

  const output2 = await app.invoke({ messages: input2 }, config);
  // console.dir({ output2 }, { depth: null });
  console.log("\n output2 >");
  for (const message of output2.messages) {
    console.log(message.content);
  }
};

run();
