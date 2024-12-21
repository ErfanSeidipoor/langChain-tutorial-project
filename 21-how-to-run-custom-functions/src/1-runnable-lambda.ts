import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableLambda } from "@langchain/core/runnables";

const prompt = ChatPromptTemplate.fromTemplate("What is {length} squared?");
const llm = new ChatOllama({ model: "llama3.2" });

const lengthFunction = (input: { foo: string }): { length: string } => {
  return { length: input.foo.length.toString() };
};

const chain = RunnableLambda.from(lengthFunction)
  .pipe(prompt)
  .pipe(llm)
  .pipe(new StringOutputParser());

const run = async () => {
  const result = await chain.invoke({ foo: "hello" });
  console.log(result);
};

run();
