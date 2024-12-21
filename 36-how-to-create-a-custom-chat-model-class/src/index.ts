import {
  SimpleChatModel,
  type BaseChatModelParams,
} from "@langchain/core/language_models/chat_models";

import { CallbackManagerForLLMRun } from "@langchain/core/callbacks/manager";
import { AIMessageChunk, type BaseMessage } from "@langchain/core/messages";
import { ChatGenerationChunk } from "@langchain/core/outputs";

interface CustomChatModelInput extends BaseChatModelParams {
  n: number;
}

class CustomChatModel extends SimpleChatModel {
  n: number;

  constructor(fields: CustomChatModelInput) {
    super(fields);
    this.n = fields.n;
  }

  _llmType() {
    return "custom";
  }

  async _call(
    messages: BaseMessage[],
    options: this["ParsedCallOptions"],
    runManager?: CallbackManagerForLLMRun
  ): Promise<string> {
    console.log("call", { messages, options, runManager });

    if (messages.length === 0) {
      throw new Error("No messages provided");
    }

    if (typeof messages[0].content !== "string") {
      throw new Error("Message content is not a string");
    }

    return messages[0].content.slice(0, this.n);
  }

  async *_streamResponseChunks(
    messages: BaseMessage[],
    options: this["ParsedCallOptions"],
    runManager?: CallbackManagerForLLMRun
  ) {
    console.log("stream", { messages, options, runManager });

    if (!messages.length) {
      throw new Error("No messages provided.");
    }
    if (typeof messages[0].content !== "string") {
      throw new Error("Multimodal messages are not supported.");
    }

    for (const letter of messages[0].content.slice(0, this.n)) {
      yield new ChatGenerationChunk({
        message: new AIMessageChunk({
          content: letter,
        }),
        text: letter,
      });

      // Trigger the appropriate callback for new chunks

      await runManager?.handleLLMNewToken(letter);
    }
  }
}

(async function () {
  const chatModel = new CustomChatModel({
    n: 4,
  });

  const response = await chatModel.invoke([
    ["human", "I am an LLM"],
    ["human", "I am from from LLAMA"],
  ]);
  console.log(response.content);

  const stream = await chatModel.stream([["human", "I am an LLM"]]);

  for await (const chunk of stream) {
    console.log(chunk);
  }
})();
