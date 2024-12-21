import { tool } from "@langchain/core/tools";
import { z } from "zod";

(async function () {
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

  const response1 = await generateRandomInts.invoke({
    min: 0,
    max: 9,
    size: 10,
  });

  console.log({ response1 });

  const response2 = await generateRandomInts.invoke({
    name: "generate_random_ints",
    args: { min: 0, max: 9, size: 10 },
    id: "123", // Required
    type: "tool_call", // Required
  });

  console.log({ response2 });
})();
