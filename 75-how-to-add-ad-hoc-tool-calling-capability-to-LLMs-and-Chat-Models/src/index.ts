import { StructuredToolInterface, tool } from "@langchain/core/tools";
import { renderTextDescription } from "langchain/tools/render";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputParser } from "@langchain/core/output_parsers";

import { z } from "zod";
import { RunnableLambda, RunnablePick } from "@langchain/core/runnables";

(async function () {
  const exponentiateTool = tool(
    (input) => {
      return Math.pow(input.first_int, input.second_int).toString();
    },
    {
      name: "exponentiate",
      description: "Exponentiate the base to the exponent power.",
      schema: z.object({
        first_int: z.number(),
        second_int: z.number(),
      }),
    }
  );

  const addTool = tool(
    (input) => {
      return (input.first_int + input.second_int).toString();
    },
    {
      name: "add",
      description: "Add two integers together.",
      schema: z.object({
        first_int: z.number(),
        second_int: z.number(),
      }),
    }
  );

  const multiplyTool = tool(
    async (input) => {
      return `${input.first_int * input.second_int}`;
    },
    {
      name: "multiply",
      description: "Multiply two integers together.",
      schema: z.object({ first_int: z.number(), second_int: z.number() }),
    }
  );

  const tools = [addTool, exponentiateTool, multiplyTool];

  const renderedTools = renderTextDescription(tools);

  console.log({ renderedTools });

  const systemPrompt = `You are an assistant that has access to the following set of tools. Here are the names and descriptions for each tool:

{rendered_tools}

Given the user input, return the name and input of the tool to use. Return your response as a JSON blob with 'name' and 'arguments' keys.`;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    ["user", "{input}"],
  ]);

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
  });

  const chain1 = prompt
    .pipe(model)
    .pipe(new JsonOutputParser())
    .pipe(new RunnablePick("arguments"))
    .pipe(
      new RunnableLambda({
        func: (input: [number, number]) =>
          multiplyTool.invoke({
            first_int: input[0],
            second_int: input[1],
          }),
      })
    );

  const response1 = await chain1.invoke({
    input: "what's thirteen times 4",
    rendered_tools: renderedTools,
  });

  console.log({ response1 });

  const chain2 = prompt
    .pipe(model)
    .pipe(new JsonOutputParser())
    .pipe(
      new RunnableLambda({
        func: (modelOutput: { name: string }) => {
          const toolMap: Record<string, StructuredToolInterface> =
            Object.fromEntries(tools.map((tool) => [tool.name, tool]));
          const chosenTool = toolMap[modelOutput.name];
          return new RunnablePick("arguments").pipe(
            new RunnableLambda({
              func: (input: [number, number]) =>
                chosenTool.invoke({
                  first_int: input[0],
                  second_int: input[1],
                }),
            })
          );
        },
      })
    );

  const response2 = await chain2.invoke({
    input: "what's 3 plus 1132",
    rendered_tools: renderedTools,
  });

  console.log({ response2 });
})();
