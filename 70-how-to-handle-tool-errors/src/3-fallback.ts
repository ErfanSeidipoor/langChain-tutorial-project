import { tool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

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

const badModelWithTools = new ChatOpenAI({
  model: "gpt-3.5-turbo-0125",
  temperature: 0,
}).bindTools([complexTool]);

const betterModelWithTools = new ChatOpenAI({
  model: "gpt-4-1106-preview",
  temperature: 0,
}).bindTools([complexTool]);

(async function () {
  const badChain = badModelWithTools
    .pipe((message: { tool_calls?: { args: any }[] }) => {
      console.log(message.tool_calls);

      return message.tool_calls ? message.tool_calls[0].args : null;
    })
    .pipe(complexTool);

  const betterChain = betterModelWithTools
    .pipe((message: { tool_calls?: { args: any }[] }) => {
      console.log(message.tool_calls);

      return message.tool_calls ? message.tool_calls[0].args : null;
    })
    .pipe(complexTool);

  const response = await badChain
    .withFallbacks([betterChain])
    .invoke("use complex tool. the args are 5, 2.1, potato");

  console.log(response);
})();
