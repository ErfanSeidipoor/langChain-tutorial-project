import { z } from "zod";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

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

  console.log("FormatInstruction >", parser.getFormatInstructions());

  const chain = RunnableSequence.from([
    ChatPromptTemplate.fromTemplate(
      "Answer the users question as best as possible.\n {format_instructions} \n{question}"
    ),
    model,
    parser,
  ]);

  const stream = await chain.stream({
    question: "What is the capital of France?",
    format_instructions: parser.getFormatInstructions(),
  });

  // StructuredOutputParser does not support partial streaming because it validates the output at each step.
  for await (const chunk of stream) {
    console.log(chunk);
  }
})();
