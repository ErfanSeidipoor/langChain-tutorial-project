import { XMLOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

(async function () {
  const model = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const parser = new XMLOutputParser();
  console.log("parser.getFormatInstructions()", parser.getFormatInstructions());

  const prompt = ChatPromptTemplate.fromTemplate(
    `{query}\n {format_instructions}`
  );

  const partialedPrompt = await prompt.partial({
    format_instructions: parser.getFormatInstructions(),
  });

  const chain = partialedPrompt.pipe(model).pipe(parser);

  const result = await chain.invoke({
    query: "Generate the shortened filmograph for Tom Hanks.",
  });

  console.log(JSON.stringify(result, null, 2));
})();
