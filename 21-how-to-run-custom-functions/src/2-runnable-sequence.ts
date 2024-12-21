import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOllama } from "@langchain/ollama";

const storyPrompt = ChatPromptTemplate.fromTemplate(
  "Tell me a short story about {topic}"
);

const llm = new ChatOllama({ model: "llama3.2" });

const chain = RunnableSequence.from([
  storyPrompt,
  llm,
  (input) => input.content.slice(0, 10), // custom function
]);

const run = async () => {
  const result = await chain.invoke({ topic: "hello" });
  console.log(result);
};

run();
