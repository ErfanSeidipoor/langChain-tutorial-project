import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  FewShotChatMessagePromptTemplate,
} from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

const examples = [
  { input: "2+2", output: "4" },
  { input: "2+3", output: "5" },
];

const examplePrompt = ChatPromptTemplate.fromMessages([
  ["human", "{input}"],
  ["ai", "{output}"],
]);

const fewShotPrompt = new FewShotChatMessagePromptTemplate({
  examplePrompt,
  examples,
  inputVariables: [], // no input variables
});

const model = new ChatOllama({
  model: "llama3.2",
});

const run = async () => {
  const result = await fewShotPrompt.invoke({});
  const messages: ["human" | "ai", string][] = [];

  for (const message of result.messages) {
    if (message instanceof HumanMessage) {
      messages.push(["human", message.content.toString()]);
    } else if (message instanceof AIMessage) {
      messages.push(["ai", message.content.toString()]);
    }
  }

  console.log({ messages });

  const finalPrompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a wondrous wizard of math."],
    ...messages,
    ["human", "{input}"],
  ]);

  const chain = finalPrompt.pipe(model);
  const response1 = await chain.invoke({
    input: "What's the square of a triangle?",
  });

  const response2 = await chain.invoke({
    input: "6 / 3",
  });

  console.log({
    response1: response1.content,
    response2: response2.content,
  });
};

run();
