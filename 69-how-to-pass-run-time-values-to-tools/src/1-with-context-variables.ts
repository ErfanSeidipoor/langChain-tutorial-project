import {
  getContextVariable,
  setContextVariable,
} from "@langchain/core/context";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { RunnableLambda } from "@langchain/core/runnables";
import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";
import { z } from "zod";

let userToPets: Record<string, string[]> = {};

const updateFavoritePets = tool(
  async (input) => {
    const userId = getContextVariable("userId");
    if (userId === undefined) {
      throw new Error(
        "No 'userId' found in current context. Remember to call setContextVariable('userId', value)"
      );
    }

    userToPets[userId] = input.pets;

    return "update_favorite_pets called";
  },
  {
    name: "update_favorite_pets",
    description: "add to the list of favorite pets.",
    schema: z.object({
      pets: z.array(z.string()),
    }),
  }
);

const handleTunTimeRequestRunnable = RunnableLambda.from(
  async (params: { userId: string; query: string; llm: BaseChatModel }) => {
    const { userId, query, llm } = params;
    setContextVariable("userId", userId);

    const tools = [updateFavoritePets];

    if (!llm.bindTools) {
      throw new Error("Language model does not support tools.");
    }
    const llmWithTools = llm.bindTools(tools);

    const modelResponse = await llmWithTools.invoke(query);

    if (modelResponse.tool_calls && modelResponse.tool_calls.length > 0) {
      console.log("tool_calls=", modelResponse.tool_calls[0].args);
      const { pets } = modelResponse.tool_calls[0].args;
      return updateFavoritePets.invoke({ pets: JSON.parse(pets) });
    } else {
      return "No tool invoked.";
    }
  }
);

const llm = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

(async function () {
  const response = await handleTunTimeRequestRunnable.invoke({
    userId: "brace",
    query: "my favorite animals are cats and parrots.",
    llm: llm,
  });

  console.log({ response });

  console.log({ userToPets });
})();
