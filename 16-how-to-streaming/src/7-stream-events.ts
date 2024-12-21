import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0.6,
});

const run = async () => {
  const eventStream = await model.streamEvents("hello", { version: "v2" });

  const events = [];
  for await (const event of eventStream) {
    process.stdout.write(event.event + " :");
    if (event.event === "on_chat_model_stream") {
      process.stdout.write(event.data.chunk.content);
    }

    console.log("\n");

    events.push(event);
  }

  console.dir(events, { depth: null });
};

run();
