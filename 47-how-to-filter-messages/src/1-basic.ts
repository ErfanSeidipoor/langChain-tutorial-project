import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  filterMessages,
} from "@langchain/core/messages";
import { ChatOllama } from "@langchain/ollama";

(async function () {
  const llm = new ChatOllama({ model: "llama3.2" });

  const messages = [
    new SystemMessage({
      content: "You are a good assistance",
      id: "1",
    }),
    new HumanMessage({
      content: "example input",
      id: "2",
      name: "example_user",
    }),
    new AIMessage({
      content: "example output",
      id: "3",
      name: "example_assistant",
    }),
    new HumanMessage({ content: "Real input", id: "4", name: "bob" }),
    new AIMessage({ content: "Real output", id: "5", name: "alice" }),
  ];

  const filter = filterMessages({
    excludeNames: ["example_user", "example_assistant"],
  });

  const chain = filter.pipe(llm);

  const response = await chain.invoke(messages);

  console.log({ response });
})();
