import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";
import { z } from "zod";

const model = new ChatOllama({
  model: "llama3.2",
});

const getCurrentWeatherSchema = z
  .object({
    location: z.string().describe("The city and state, e.g. San Francisco, CA"),
    unit: z
      .enum(["celsius", "fahrenheit"])
      .describe("The unit of return temperature"),
  })
  .describe("Get the current weather in a given location");

const getCurrentWeatherTool = tool(() => "", {
  name: "getCurrentWeather",
  description: "Get the current weather in a given location",
  schema: getCurrentWeatherSchema,
});

const llmWithTools = model.bindTools([getCurrentWeatherTool]);

const run = async () => {
  const result1 = await llmWithTools.invoke(
    "What's the weather in SF, NYC and LA?"
  );

  console.log(result1);
};

run();
