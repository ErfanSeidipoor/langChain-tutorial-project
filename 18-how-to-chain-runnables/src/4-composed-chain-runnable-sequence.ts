import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

const prompt = ChatPromptTemplate.fromTemplate("tell me a joke about {topic}");
const analysisPrompt = ChatPromptTemplate.fromTemplate(
  "Is this a funny joke ? {joke}"
);

const chain = prompt.pipe(model).pipe(new StringOutputParser());

const composedChain = RunnableSequence.from([
  chain,
  (input) => ({ joke: input }),
  analysisPrompt,
  model,
  new StringOutputParser(),
]);

const run = async () => {
  const response = await composedChain.invoke({ topic: "bears" });
  console.log({ response });
};

run();
