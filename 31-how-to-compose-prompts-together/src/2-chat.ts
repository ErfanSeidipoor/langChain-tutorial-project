import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { HumanMessagePromptTemplate } from "@langchain/core/prompts";

const prompt = new SystemMessage("You are a nice pirate");

const newPrompt = HumanMessagePromptTemplate.fromTemplate([
  prompt,
  new HumanMessage("Hi"),
  new AIMessage("what?"),
  "{input}",
]);

const run = async () => {
  const result = await newPrompt.formatMessages({ input: "i said hi" });
  console.log({ result });
};
run();
