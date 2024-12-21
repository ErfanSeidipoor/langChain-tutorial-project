import { ChatOpenAI } from "@langchain/openai";

const shorterLLm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
});

const longerLLM = new ChatOpenAI({
  model: "gpt-3.5-turbo-16k",
});

const modelWithFallback = shorterLLm.withFallbacks([longerLLM]);

const input = `what is the next number: ${"one, two, ".repeat(3000)}`;

const run = async () => {
  try {
    const result = await modelWithFallback.invoke(input);
    console.log({ result });
  } catch (error) {
    console.log("error >", error);
  }
};

run();
