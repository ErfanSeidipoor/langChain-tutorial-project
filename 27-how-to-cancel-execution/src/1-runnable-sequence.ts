import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOllama } from "@langchain/ollama";

const controller = new AbortController();

const retriever = new TavilySearchAPIRetriever({
  k: 3,
});

const prompt = ChatPromptTemplate.fromTemplate(`
    User the following context to answer question to the best of your ability:

    <context>
        {context}
    </context>

    Question: {question}
`);

const llm = new ChatOllama({
  model: "llama3.2",
});

const chain = RunnableSequence.from([
  {
    context: retriever.pipe((docs) =>
      docs.map((doc) => doc.pageContent).join("\n")
    ),
    question: new RunnablePassthrough(),
  },
  prompt,
  llm,
  new StringOutputParser(),
]);

const run = async () => {
  setTimeout(() => controller.abort(), 1000);

  console.time("timer");
  const result = await chain.invoke("What si the current weather in SF?", {
    signal: controller.signal,
  });
  console.log({ result });

  console.timeEnd("timer");
};

run();
