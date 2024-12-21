import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0.6,
});

const prompt = ChatPromptTemplate.fromTemplate<{ topic: string }>(
  "Tell me a joke about {topic}"
);

const parser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(parser);

const run = async () => {
  const stream = await chain.stream({
    topic: "parrot",
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk);
  }
};

run();
