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

function generateToolsForUser(userId: string) {
  const updateFavoritePets = tool(
    async (input) => {
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

  return [updateFavoritePets];
}

const handleTunTimeRequest = async (params: {
  userId: string;
  query: string;
  llm: BaseChatModel;
}) => {
  const { userId, query, llm } = params;

  const tools = generateToolsForUser(userId);

  if (!llm.bindTools) {
    throw new Error("Language model does not support tools.");
  }
  const llmWithTools = llm.bindTools(tools);

  const modelResponse = await llmWithTools.invoke(query);

  if (modelResponse.tool_calls && modelResponse.tool_calls.length > 0) {
    console.log("tool_calls=", modelResponse.tool_calls[0].args);
    const { pets } = modelResponse.tool_calls[0].args;
    return tools[0].invoke({ pets: JSON.parse(pets) });
  } else {
    return "No tool invoked.";
  }
};

const llm = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

(async function () {
  const [updatePets] = generateToolsForUser("Cobb");

  await updatePets.invoke({ pets: ["tiger", "wolf"] });

  console.log({ userToPets });

  const response = await handleTunTimeRequest({
    userId: "brace",
    query: "my favorite animals are cats and parrots.",
    llm: llm,
  });

  console.log({ response });

  console.log({ userToPets });
})();
