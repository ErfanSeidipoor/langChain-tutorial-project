import { RunnableConfig } from "@langchain/core/runnables";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const reverseTool = tool(
  async (input: { text: string }, config?: RunnableConfig) => {
    const originalString =
      input.text + (config?.configurable?.additional_field ?? "");
    return originalString.split("").reverse().join("");
  },
  {
    name: "reverse_tool",
    description:
      "A Test tool that combines input text with a configurable parameter",
    schema: z.object({
      text: z.string(),
    }),
  }
);

(async function () {
  const response = await reverseTool.invoke(
    { text: "abc" },
    { configurable: { additional_field: "123" } }
  );
  console.log({ response });
})();
