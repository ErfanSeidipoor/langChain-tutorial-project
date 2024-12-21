import { ConsoleCallbackHandler } from "@langchain/core/tracers/console";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

(async function () {
  const handler = new ConsoleCallbackHandler({});
  const prompts = ChatPromptTemplate.fromTemplate("Whats is 1 + {number} ?");

  const model = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const chain = prompts.pipe(model).withConfig({
    callbacks: [handler],
  });

  await chain.invoke({ number: 2 });
})();
