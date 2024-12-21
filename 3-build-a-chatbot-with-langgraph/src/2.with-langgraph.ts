import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { v4 as uuidv4 } from "uuid";

console.clear();

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

// Define the function that calls the model
const callModel = async (state: typeof MessagesAnnotation.State) => {
  const response = await llm.invoke(state.messages);
  return { messages: response };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
  // Define node
  .addNode("model", callModel)
  // Define Edge
  .addEdge(START, "model")
  .addEdge("model", END);

const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });

const config = { configurable: { thread_id: uuidv4() } };
const config2 = { configurable: { thread_id: uuidv4() } };

const run = async () => {
  /* --------------------------------- input1 --------------------------------- */
  const input1 = [
    {
      role: "user",
      content: "Hi! I'm Bob.",
    },
  ];

  const output1 = await app.invoke({ messages: input1 }, config);
  console.dir({ memory, output1 }, { depth: null });
  console.log("\noutput1 >");
  for (const message of output1.messages) {
    console.log(message.content);
  }
  /* --------------------------------- input2 --------------------------------- */
  const input2 = [
    {
      role: "user",
      content: "What's my name?",
    },
  ];

  const output2 = await app.invoke({ messages: input2 }, config);

  // console.dir({ memory, output2 }, { depth: null });
  console.log("\noutput2 >");
  for (const message of output2.messages) {
    console.log(message.content);
  }

  /* --------------------------------- input3 --------------------------------- */

  const input3 = [
    {
      role: "user",
      content: "What's my name?",
    },
  ];
  const output3 = await app.invoke({ messages: input3 }, config2);

  console.log("\noutput3 >");
  for (const message of output3.messages) {
    console.log(message.content);
  }
  /* --------------------------------- input4 --------------------------------- */
};

run();
