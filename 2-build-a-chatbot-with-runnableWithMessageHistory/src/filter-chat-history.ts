import {
  AIMessage,
  HumanMessage,
  type BaseMessage,
} from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

type ChainInput = {
  chat_history: BaseMessage[];
  input: string;
};

const filterMessages = (input: ChainInput) => input.chat_history.slice(-10);

const model = new ChatOpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  model: "gpt-3.5-turbo",
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful assistant who remembers all details the user shares with you.`,
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
]);

const messages = [
  new HumanMessage({ content: "hi! I'm bob" }),
  new AIMessage({ content: "hi!" }),
  new HumanMessage({ content: "I like vanilla ice cream" }),
  new AIMessage({ content: "nice" }),
  new HumanMessage({ content: "whats 2 + 2" }),
  new AIMessage({ content: "4" }),
  new HumanMessage({ content: "thanks" }),
  new AIMessage({ content: "No problem!" }),
  new HumanMessage({ content: "having fun?" }),
  new AIMessage({ content: "yes!" }),
  new HumanMessage({ content: "That's great!" }),
  new AIMessage({ content: "yes it is!" }),
];

const run = async () => {
  const chain = RunnableSequence.from<ChainInput>([
    RunnablePassthrough.assign({
      chat_history: filterMessages,
    }),
    prompt,
    model,
  ]);

  const response1 = await chain.invoke({
    chat_history: messages,
    input: "what's my name?",
  });

  console.log({ response: response1.content });

  const response2 = await chain.invoke({
    chat_history: messages,
    input: "what's my fav ice cream",
  });

  console.log({ response: response2.content });
};

run();
