import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableLambda } from "@langchain/core/runnables";

const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

const prompt = ChatPromptTemplate.fromTemplate("tell me a joke about {topic}");
const analysisPrompt = ChatPromptTemplate.fromTemplate(
  "Is this a funny joke ? {joke}"
);

const chain = prompt.pipe(model).pipe(new StringOutputParser());

const composedChain = new RunnableLambda({
  func: async (input: { topic: string }) => {
    const joke = await chain.invoke({ topic: input.topic });
    return { joke };
  },
})
  .pipe(analysisPrompt)
  .pipe(model)
  .pipe(new StringOutputParser());

const run = async () => {
  const response = await composedChain.invoke({ topic: "bears" });
  console.log({ response });
};

run();
