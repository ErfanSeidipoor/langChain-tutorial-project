import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const run = async () => {
  const response = await model.invoke([
    new HumanMessage("HI, Im Bob"),
    new SystemMessage("Hello Bob, how can I help you?"),
    new HumanMessage("What is my name ?"),
  ]);

  console.log(response.content);
};

run();
