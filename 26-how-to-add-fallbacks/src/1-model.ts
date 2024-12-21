import { ChatOpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/ollama";

const fakeOpenAIModel = new ChatOpenAI({
  model: "potato!",
  maxRetries: 0,
});

const ollamaModel = new ChatOllama({
  model: "llama3.2",
});

const modelWithFallback = fakeOpenAIModel.withFallbacks([ollamaModel]);

const run = async () => {
  const result = await modelWithFallback.invoke(
    "Whats is your model version and name ?"
  );
  console.log({ result });
};

run();
