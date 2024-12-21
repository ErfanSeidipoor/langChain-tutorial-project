import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0.6,
});

const chain = model.pipe(new JsonOutputParser());

const run = async () => {
  const eventStream = await chain.streamEvents(
    `Output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key "name" and "population"`,
    { version: "v2" }
  );

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
