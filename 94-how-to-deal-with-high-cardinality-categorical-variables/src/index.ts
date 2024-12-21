import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { faker } from "@faker-js/faker";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { z } from "zod";

const searchSchema = z.object({
  query: z.string(),
  author: z.string(),
});

(async function () {
  const names = Array.from({ length: 10000 }, () =>
    (faker as any).person.fullName()
  );

  console.log(names[0]);

  const llm = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const system = `Generate a relevant search query for a library system`;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", system],
    ["human", "{question}"],
  ]);

  const llmWithTools = llm.withStructuredOutput(searchSchema, {
    name: "Search",
  });

  const queryAnalyzer = RunnableSequence.from([
    {
      question: new RunnablePassthrough(),
    },
    prompt,
    llmWithTools,
  ]);

  const response = await queryAnalyzer.invoke(
    "what are books about aliens by Jesse Knight"
  );

  console.log({ response });

  const systemTemplate = `Generate a relevant search query for a library system using the 'search' tool.

The 'author' you return to the user MUST be one of the following authors:

{authors}

Do NOT hallucinate author name!`;
  const basePrompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["human", "{question}"],
  ]);
  const promptWithAuthors = await basePrompt.partial({
    authors: names.join(", "),
  });

  const queryAnalyzerAll = RunnableSequence.from([
    {
      question: new RunnablePassthrough(),
    },
    promptWithAuthors,
    llmWithTools,
  ]);

  const response1 = await queryAnalyzerAll.invoke(
    "what are books about aliens by jess knight"
  );
  console.log({ response1 });

  const embeddings = new OllamaEmbeddings({ model: "mxbai-embed-large" });
  const vectorstore = await MemoryVectorStore.fromTexts(names, {}, embeddings);

  const selectNames = async (question: string) => {
    const _docs = await vectorstore.similaritySearch(question, 10);
    const _names = _docs.map((d) => d.pageContent);
    return _names.join(", ");
  };

  const createPrompt = RunnableSequence.from([
    {
      question: new RunnablePassthrough(),
      authors: selectNames,
    },
    basePrompt,
  ]);

  const response2 = await createPrompt.invoke("what are books by jess knight");
  console.log({ response2 });

  const queryAnalyzerSelect = createPrompt.pipe(llmWithTools);

  const response3 = await queryAnalyzerSelect.invoke(
    "what are books about aliens by jess knight"
  );

  console.log({ response3 });
})();
