import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  model: "gpt-3.5-turbo",
});

const messages = [
  new HumanMessage("HI! my name is Bob?"),
  new AIMessage("Hello Bob! How can I help you today?"),
  new HumanMessage({ content: "What's my name?" }),
];

console.log({ messages });

const run = async () => {
  const result = await model.invoke(messages);
  console.dir(result, { depth: null, colors: true });

  const parser = new StringOutputParser();
  console.log(await parser.invoke(result));
};

run();
