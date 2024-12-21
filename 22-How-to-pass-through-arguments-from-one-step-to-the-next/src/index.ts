import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
  RunnableParallel,
} from "@langchain/core/runnables";

import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const template = `Answer the question based only on the following context:
{context}

Question: {question}
`;

const prompt = ChatPromptTemplate.fromTemplate(template);

const model = new ChatOllama({ model: "llama3.2" });

const runnableParallel = RunnableParallel.from([
  {
    passed: new RunnablePassthrough<{ num: number }>(),
    modified: (input: { num: number }) => input.num + 1,
  },
]);

const run1 = async () => {
  const result1 = await runnableParallel.invoke({ num: 10 });

  console.log({ result1 });
};

run1();

const run2 = async () => {
  const vectorStore = await MemoryVectorStore.fromDocuments(
    [{ pageContent: "harrison worked at kensho", metadata: {} }],
    new OllamaEmbeddings()
  );

  const retriever = vectorStore.asRetriever();
  const retrieverChain = RunnableSequence.from([
    {
      context: retriever.pipe((docs) => docs[0].pageContent),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const result = await retrieverChain.invoke("Where did harrison work");
  console.log({ result });
};

run2();
