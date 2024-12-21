import {
  RunnableParallel,
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const runnableParallel = RunnableParallel.from([
  {
    exrea: RunnablePassthrough.assign({
      mult: (input: { num: number }) => input.num * 3,
      modified: (input: { num: number }) => input.num + 1,
    }),
  },
]);

const run1 = async () => {
  const result = await runnableParallel.invoke({ num: 10 });

  console.dir({ result }, { depth: null });
};

run1();

const template = `
Answer the question based only on the following context: {context}

Question: {question}
`;

const prompt = ChatPromptTemplate.fromTemplate(template);

const model = new ChatOllama({ model: "llama3.2" });
const generationChain = prompt.pipe(model).pipe(new StringOutputParser());

const run2 = async () => {
  const vectorstore = await MemoryVectorStore.fromDocuments(
    [{ pageContent: "harrison worked at kensho", metadata: {} }],
    new OllamaEmbeddings()
  );

  const retriever = vectorstore.asRetriever();

  const retrieverChain = RunnableSequence.from([
    {
      context: retriever.pipe((docs) => docs[0].pageContent),
      question: new RunnablePassthrough(),
    },
    RunnablePassthrough.assign({
      output: generationChain,
    }),
  ]);

  const stream = await retrieverChain.stream("where did harrison work?");

  for await (const chunk of stream) {
    console.log(chunk);
  }
};

run2();
