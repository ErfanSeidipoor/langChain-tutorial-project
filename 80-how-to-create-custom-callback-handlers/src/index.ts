import { Callbacks } from "@langchain/core/callbacks/manager";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

(async function () {
  const customHandler: Callbacks = [
    {
      handleChatModelStart: async (llm, inputMessages, runId) => {
        console.log("Chat model start:", llm, inputMessages, runId);
      },
      handleLLMNewToken: async (token) => {
        console.log("Chat model new token", token);
      },
    },
  ];

  const prompts = ChatPromptTemplate.fromTemplate("Whats is 1 + {number} ?");

  const model = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const chain = prompts.pipe(model);

  const stream = await chain.stream(
    { number: "2" },
    { callbacks: customHandler }
  );

  for await (const _ of stream) {
    // Just consume the stream so the callbacks run
  }
})();
