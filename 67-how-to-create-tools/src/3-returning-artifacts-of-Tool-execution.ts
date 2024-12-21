import { z } from "zod";
import { tool } from "@langchain/core/tools";

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

(async function () {
  const response = await generateRandomInts.invoke({
    min: 1,
    max: 10,
    size: 5,
  });

  console.log({ response });

  const output = await generateRandomInts.invoke({
    name: "generateRandomInts",
    args: { min: 0, max: 9, size: 10 },
    id: "123", // required
    type: "tool_call",
  });
  console.log({ output });
})();
