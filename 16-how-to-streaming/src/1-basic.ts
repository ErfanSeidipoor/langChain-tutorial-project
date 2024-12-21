import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

const run = async () => {
  const stream = await model.stream("Hello! Tell me about yourself.");

  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
    process.stdout.write(chunk.content + "");
  }
  console.log("\n\n\n\n");

  console.log(chunks[0]);
};

run();
