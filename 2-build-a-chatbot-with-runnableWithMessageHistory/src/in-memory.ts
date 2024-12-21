import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  model: "gpt-3.5-turbo",
});

const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful assistant who remembers all details the user shares with you.`,
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
]);

const chain = prompt.pipe(model);

const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: async (sessionId) => {
    console.dir({ sessionId, messageHistories }, { depth: null, colors: true });
    if (messageHistories[sessionId] === undefined) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory();
    }
    return messageHistories[sessionId];
  },
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

const run = async () => {
  const response = await withMessageHistory.invoke(
    {
      input: "My name is bob",
    },
    {
      configurable: {
        sessionId: "SESSION_ID",
      },
    }
  );

  console.log({ response: response.content });

  const followupResponse = await withMessageHistory.invoke(
    {
      input: "what is my name ?",
    },
    {
      configurable: {
        sessionId: "SESSION_ID",
      },
    }
  );

  console.log({ followupResponse: followupResponse.content });
};

run();
