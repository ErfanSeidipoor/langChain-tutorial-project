import { ChatOllama } from "@langchain/ollama";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  trimMessages,
} from "@langchain/core/messages";

(async function () {
  const messages = [
    new SystemMessage("You're a good assistant, you always respond with joke."),
    new HumanMessage("I wonder why it's called langchain"),
    new AIMessage(
      'Well, I guess they thought "WordRope" and "SentenceString" just didn\'t have the same ring to it!'
    ),
    new HumanMessage("and who is harrison chasing anyways"),
    new AIMessage(
      "Hmmm let me think.\n\nWhy, he's probably chasing after the last cup of coffee in the office!"
    ),
    new HumanMessage("what do you call a speechless parrot"),
  ];

  const llm = new ChatOllama({ model: "llama3.2" });

  const trimmer = trimMessages({
    maxTokens: 45,
    strategy: "last",
    tokenCounter: llm,
    includeSystem: true,
  });

  console.log(await trimmer.invoke(messages));

  const chain = trimmer.pipe(llm);

  const response = await chain.invoke(messages);

  console.log({ response });
})();
