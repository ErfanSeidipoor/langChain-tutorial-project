import { ChatOllama } from "@langchain/ollama";

const ollamaLlm = new ChatOllama({
  model: "llama3.2",
});

const run = async () => {
  const response = await ollamaLlm.invoke(
    "Simulate a rap battle between Stephen and John Oliver"
  );

  console.log(response.content);
};

run();
