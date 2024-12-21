import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const prompt = ChatPromptTemplate.fromTemplate("tell me a joke about {topic}");

const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

const chain = prompt.pipe(model).pipe(new StringOutputParser());

const run = async () => {
  const response = await chain.invoke({ topic: "bears" });
  console.log({ response });
};

run();
