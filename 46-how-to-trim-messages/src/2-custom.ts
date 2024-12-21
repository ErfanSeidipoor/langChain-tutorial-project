import { encodingForModel } from "@langchain/core/utils/tiktoken";
import {
  BaseMessage,
  HumanMessage,
  AIMessage,
  ToolMessage,
  SystemMessage,
  MessageContent,
  MessageContentText,
  trimMessages,
} from "@langchain/core/messages";

async function strTokenCounter(
  messageContent: MessageContent
): Promise<number> {
  if (typeof messageContent === "string") {
    return (await encodingForModel("gpt-4")).encode(messageContent).length;
  } else {
    if (messageContent.every((x) => x.type === "text" && x.text)) {
      return (await encodingForModel("gpt-4")).encode(
        (messageContent as MessageContentText[])
          .map(({ text }) => text)
          .join("")
      ).length;
    }
    throw new Error(
      `Unsupported message content ${JSON.stringify(messageContent)}`
    );
  }
}

async function tiktokenCounter(messages: BaseMessage[]): Promise<number> {
  let numTokens = 3; // every reply is primed with <|start|>assistant<|message|>
  const tokensPerMessage = 3;
  const tokensPerName = 1;

  for (const msg of messages) {
    let role: string;
    if (msg instanceof HumanMessage) {
      role = "user";
    } else if (msg instanceof AIMessage) {
      role = "assistant";
    } else if (msg instanceof ToolMessage) {
      role = "tool";
    } else if (msg instanceof SystemMessage) {
      role = "system";
    } else {
      throw new Error(`Unsupported message type ${msg.constructor.name}`);
    }

    numTokens +=
      tokensPerMessage +
      (await strTokenCounter(role)) +
      (await strTokenCounter(msg.content));

    if (msg.name) {
      numTokens += tokensPerName + (await strTokenCounter(msg.name));
    }
  }

  return numTokens;
}

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
    maxTokens: 45,
    strategy: "last",
    tokenCounter: tiktokenCounter,
  });

  console.log(trimmed);
})();
