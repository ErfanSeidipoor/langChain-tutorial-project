import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  trimMessages,
} from "@langchain/core/messages";

import { ChatOllama } from "@langchain/ollama";

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

  const trimmed = await trimMessages(messages, {
    maxTokens: 150,
    strategy: "last",
    tokenCounter: new ChatOllama({ model: "llama3.2" }),
    includeSystem: true,
    allowPartial: true,
    startOn: "human",
  });

  console.log(trimmed);
})();
