import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableLambda, type RunnableConfig } from "@langchain/core/runnables";
import { ChatOllama } from "@langchain/ollama";

const echo = async (text: string, config: RunnableConfig) => {
  const prompt = ChatPromptTemplate.fromTemplate(
    "Reverse the following text: {text}"
  );

  const model = new ChatOllama({ model: "llama3.2" });
  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  return chain.invoke({ text }, config);
};

const run = async () => {
  const output = await RunnableLambda.from(echo).invoke("foo", {
    callbacks: [
      {
        handleLLMEnd: (output) => console.dir(output, { depth: null }),
      },
    ],
  });
};

run();
