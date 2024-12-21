import { ChatOllama } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

// const model = new ChatOpenAI({
//   model: "gpt-3.5-turbo",
// });

(async function () {
  const stream = await model.stream("introduce yourself");

  console.log(`\n`);
  for await (const chunk of stream) {
    process.stdout.write(chunk.content.toString());
  }
  console.log(`\n`);

  const eventStream = await model.streamEvents(
    "give a short story about a walnut",
    {
      version: "v2",
    }
  );

  const events = [];
  for await (const event of eventStream) {
    if (event.data && event.data.chunk && event.data.chunk.content) {
      process.stdout.write(event.data.chunk.content.toString());
    }

    events.push(event);
  }

  console.log(events.slice(0, 3));
})();
