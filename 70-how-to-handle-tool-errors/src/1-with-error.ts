import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";
import { z } from "zod";

const llm = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

const complexTool = tool(
  async (params) => {
    return params.int_arg * params.float_arg;
  },
  {
    name: "complex_tool",
    description: "Do Somethings complex with a complex tool",
    schema: z.object({
      int_arg: z.number(),
      float_arg: z.number(),
      number_arg: z.object({}),
    }),
  }
);

const llmWithTools = llm.bindTools([complexTool]);

(async function () {
  const chain = llmWithTools
    .pipe((message: { tool_calls?: { args: any }[] }) => {
      console.log(message.tool_calls);

      return message.tool_calls ? message.tool_calls[0].args : null;
    })
    .pipe(complexTool);

  const response = await chain.invoke(
    "use complex tool. the args are 5, 2.1, potato"
  );

  console.log({ response });
})();
