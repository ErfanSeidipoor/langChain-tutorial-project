import { AIMessage } from "@langchain/core/messages";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

(async function () {
  const model = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });

  const zodSchema = z.object({
    answer: z.string().describe("answer to the user's question"),
    source: z
      .string()
      .describe(
        "source used to answer the user's question, should be a website"
      ),
  });

  const parser = StructuredOutputParser.fromZodSchema(zodSchema);

  const response1 = await parser.invoke(
    new AIMessage(`{"answer": "Paris", "source": "I made it up"}`)
  );
  console.log({ response1 });

  try {
    const response = await parser.invoke(new AIMessage(`{ badfield: "foo" }`));
    console.log({ response });
  } catch (error) {
    console.log(error);
  }

  try {
    const response = await parser.invoke(
      new AIMessage(`{"answer": "Paris", "source1": "I made it up"}`)
    );
    console.log({ response });
  } catch (error) {
    console.log(error);
  }
})();
