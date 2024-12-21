import { tool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

(async () => {
  const randomIntToolSchema = z.object({
    min: z.number(),
    max: z.number(),
    size: z.number(),
  });

  const generateRandomInts = tool(
    async ({ min, max, size }) => {
      const array: number[] = [];
      for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      return [
        `Successfully generated array of ${size} random ints in [${min}, ${max}].`,
        array,
      ];
    },
    {
      name: "generateRandomInts",
      description: "Generate size random ints in the range [min, max].",
      schema: randomIntToolSchema,
      responseFormat: "content_and_artifact",
    }
  );

  const llmWithTools = model.bindTools([generateRandomInts]);

  const aiMessage = await llmWithTools.invoke(
    "generate 6 positive ints less than 25"
  );

  if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
    const toolCall = aiMessage.tool_calls[0];
    if (
      toolCall.args &&
      typeof toolCall.args.min === "number" &&
      typeof toolCall.args.max === "number" &&
      typeof toolCall.args.size === "number"
    ) {
      const response = await generateRandomInts.invoke({
        min: toolCall.args.min,
        max: toolCall.args.max,
        size: toolCall.args.size,
      });

      console.log({ response });
    }
  }
})();
