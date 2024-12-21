import { SemanticSimilarityExampleSelector } from "@langchain/core/example_selectors";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import {
  ChatPromptTemplate,
  FewShotChatMessagePromptTemplate,
} from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

const model = new ChatOllama({
  model: "llama3.2",
});

const examples = [
  { input: "2+2", output: "4" },
  { input: "2+3", output: "5" },
  { input: "2+4", output: "6" },
  { input: "What did the cow say to the moon?", output: "nothing at all" },
  {
    input: "Write me a poem about the moon",
    output:
      "One for the moon, and one for me, who are we to talk about the moon?",
  },
];

const toVectorize = examples.map(
  (example) => example.input + " " + example.output
);

const QUESTION = "3+3";
const run = async () => {
  const vectorStore = await MemoryVectorStore.fromTexts(
    toVectorize,
    examples,
    new OllamaEmbeddings()
  );

  const exampleSelector = new SemanticSimilarityExampleSelector({
    vectorStore,
    k: 2,
  });

  const response = await exampleSelector.selectExamples({
    input: "moon",
  });

  console.log("moon >", { response });

  const fewShotPrompt = new FewShotChatMessagePromptTemplate({
    inputVariables: ["input"],
    exampleSelector,
    examplePrompt: ChatPromptTemplate.fromMessages([
      ["human", "{input}"],
      ["ai", "{output}"],
    ]),
  });

  const fewShotPromptResult = await fewShotPrompt.invoke({
    input: QUESTION,
  });

  const messages: ["human" | "ai", string][] = [];

  for (const message of fewShotPromptResult.messages) {
    if (message instanceof HumanMessage) {
      messages.push(["human", message.content.toString()]);
    } else if (message instanceof AIMessage) {
      messages.push(["ai", message.content.toString()]);
    }
  }
  console.log({ messages });

  const finalPrompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a wondrous wizard of math."],
    ...messages,
    ["human", "{input}"],
  ]);

  const chain = finalPrompt.pipe(model);

  const response1 = await chain.invoke({
    input: QUESTION,
  });

  console.log({ response1 });
};

run();
