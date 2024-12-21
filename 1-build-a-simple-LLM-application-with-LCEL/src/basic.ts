import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  model: "gpt-3.5-turbo",
});

const messages = [
  new SystemMessage("Translate the following from English into Italian"),
  new HumanMessage("hi!"),
];

console.log({ messages });

const run = async () => {
  const result = await model.invoke(messages);
  console.dir(result, { depth: null, colors: true });

  const parser = new StringOutputParser();
  console.log(await parser.invoke(result));
};

run();
