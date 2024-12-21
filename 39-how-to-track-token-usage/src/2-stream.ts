import { ChatOllama } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";
import type { AIMessageChunk } from "@langchain/core/messages";
import { concat } from "@langchain/core/utils/stream";

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
});

// const model = new ChatOllama({
//   model: "llama3.2",
//   temperature: 0,
// });

(async function () {
  const response = await model.stream("Hello, how are you?", {
    // Pass the stream options
    stream_options: {
      include_usage: true,
    },
  });

  let finalResult: AIMessageChunk | undefined;
  for await (const chunk of response) {
    // console.log({ chunk });
    if (finalResult) {
      concat(finalResult, chunk);
    } else {
      finalResult = chunk;
    }
  }

  console.log(finalResult);
  console.log(finalResult?.usage_metadata);
})();
