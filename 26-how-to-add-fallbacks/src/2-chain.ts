import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const chatPrompt = ChatPromptTemplate.fromMessages<{ animal: string }>([
  [
    "system",
    "Your're a nice assistant who always includes a compliment in your response.",
  ],
  ["human", "Why did the {animal} cross the road?"],
]);

const fakeOpenAIModel = new ChatOpenAI({
  model: "potato!",
  maxRetries: 1,
});

const prompt = PromptTemplate.fromTemplate(`
    Instructions: You should always include a compliment in your response.

    Question: why did the {animal} cross the road ?
    
    Answer
`);

const openAILLM = new ChatOpenAI({
  model: "gpt-3.5-turbo",
});

const badChain = chatPrompt
  .pipe(fakeOpenAIModel)
  .pipe(new StringOutputParser());

const goodCahin = prompt.pipe(openAILLM).pipe(new StringOutputParser());

const chain = badChain.withFallbacks([goodCahin]);

const run = async () => {
  const result = await chain.invoke({
    animal: "llama",
  });

  console.log({ result });
};

run();
