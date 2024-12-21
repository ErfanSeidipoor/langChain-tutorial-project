import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { OutputFixingParser } from "langchain/output_parsers";
import { z } from "zod";

import { ChatOllama } from "@langchain/ollama";

(async function () {
  const zodSchema = z.object({
    name: z.string().describe("name of an actor"),
    film_names: z
      .array(z.string())
      .describe("list of names of films they starred in"),
  });

  const model = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const parser = StructuredOutputParser.fromZodSchema(zodSchema);

  const misFormatted = "{'name': 'Tom Hanks', 'film_names': ['Forrest Gump']}";

  let response;
  try {
    response = await parser.parse(misFormatted);
  } catch (error) {
    console.log({ error });

    const parserWithFix = OutputFixingParser.fromLLM(model, parser);
    response = await parserWithFix.parse(misFormatted);
  }

  console.log({ response });
})();
