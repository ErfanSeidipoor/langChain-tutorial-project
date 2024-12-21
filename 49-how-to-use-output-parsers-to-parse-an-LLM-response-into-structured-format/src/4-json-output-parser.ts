import { z } from "zod";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/ollama";

(async function () {
  const template = `Return a JSON object with a single key named "answer" that answers the following question: {question}.
  Do not wrap the JSON output in markdown blocks.`;

  const model = new ChatOllama({ model: "llama3.2", temperature: 0 });

  const jsonPrompt = ChatPromptTemplate.fromTemplate(template);
  const jsonParser = new JsonOutputParser();
  const jsonChain = jsonPrompt.pipe(model).pipe(jsonParser);

  const stream = await jsonChain.stream({
    question: "Who invented the microscope?",
  });

  for await (const s of stream) {
    console.log(s);
  }
})();
