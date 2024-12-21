import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { v4 as uuidv4 } from "uuid";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

console.clear();

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You talk like a pirate. Answer all questions to the best of your ability.",
  ],
  new MessagesPlaceholder("messages"),
]);

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

// Define the function that calls the model
const callModel = async (state: typeof MessagesAnnotation.State) => {
  const chain = prompt.pipe(llm);
  const response = await chain.invoke(state);
  return { messages: [response] };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
  // Define node
  .addNode("model", callModel)
  // Define Edge
  .addEdge(START, "model")
  .addEdge("model", END);

const app = workflow.compile({ checkpointer: new MemorySaver() });

const config = { configurable: { thread_id: uuidv4() } };

const run = async () => {
  /* --------------------------------- input1 --------------------------------- */
  const input1 = [
    {
      role: "user",
      content: "Hi! I'm Jim.",
    },
  ];

  const output1 = await app.invoke({ messages: input1 }, config);
  // console.dir({ output1 }, { depth: null });
  console.log("\n output1 >");
  for (const message of output1.messages) {
    console.log(message.content);
  }

  const input2 = [
    {
      role: "user",
      content: "What is my name?",
    },
  ];

  const output2 = await app.invoke({ messages: input2 }, config);
  // console.dir({ output2 }, { depth: null });
  console.log("\n output2 >");
  for (const message of output2.messages) {
    console.log(message.content);
  }

  /* --------------------------------- input2 --------------------------------- */
  // const input2 = [
  //   {
  //     role: "user",
  //     content: "What's my name?",
  //   },
  // ];

  // const output2 = await app.invoke({ messages: input2 }, config);

  // // console.dir({ memory, output2 }, { depth: null });
  // console.log("\noutput2 >");
  // for (const message of output2.messages) {
  //   console.log(message.content);
  // }

  // /* --------------------------------- input3 --------------------------------- */

  // const input3 = [
  //   {
  //     role: "user",
  //     content: "What's my name?",
  //   },
  // ];
  // const output3 = await app.invoke({ messages: input3 }, config2);

  // console.log("\noutput3 >");
  // for (const message of output3.messages) {
  //   console.log(message.content);
  // }
  // /* --------------------------------- input4 --------------------------------- */
};

run();
