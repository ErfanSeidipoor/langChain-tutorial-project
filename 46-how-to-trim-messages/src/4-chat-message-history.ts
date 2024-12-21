import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
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

  const chatHistory = new InMemoryChatMessageHistory();

  const dummyGetSessionHistory = async (sessionId: string) => {
    if (sessionId !== "1") {
      throw new Error("Session not found");
    }
    return chatHistory;
  };

  const llm = new ChatOllama({ model: "llama3.2" });

  const trimmer = trimMessages({
    maxTokens: 45,
    strategy: "last",
    tokenCounter: llm,
    includeSystem: true,
  });

  const chain = trimmer.pipe(llm);
  const chainWithHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: dummyGetSessionHistory,
  });

  const response = await chainWithHistory.invoke(
    [new HumanMessage("what do you call a speechless parrot")],
    { configurable: { sessionId: "1" } }
  );

  console.log({ response });
})();
