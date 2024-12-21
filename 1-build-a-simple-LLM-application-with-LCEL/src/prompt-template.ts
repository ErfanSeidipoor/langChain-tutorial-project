import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  model: "gpt-3.5-turbo",
});

const promptTemplate = ChatPromptTemplate.fromMessages<{
  language: string;
  text: string;
}>([
  ["system", "Translate the following into {language}:"],
  ["user", "{text}"],
]);

const run = async () => {
  const promptValue = await promptTemplate.invoke({
    language: "Italian",
    text: "hi!",
  });

  const parser = new StringOutputParser();

  console.dir(promptValue, { depth: null, colors: true });
  console.dir(promptValue.toChatMessages(), { depth: null, colors: true });

  const llmChain = promptTemplate.pipe(model).pipe(parser);

  const result = await llmChain.invoke({ language: "french", text: "hi!" });

  console.dir(result, { depth: null, colors: true });
};

run();
