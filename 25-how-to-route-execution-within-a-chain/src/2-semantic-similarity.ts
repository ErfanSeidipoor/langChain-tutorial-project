import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { cosineSimilarity } from "@langchain/core/utils/math";

const llm = new ChatOllama({
  model: "llama3.2",
});

const physicsTemplate = `
    You are a very smart physics professor.
    You are great at answering questions about physics in a concise and easy to understand manner.
    When you don't know the answer to a question you admit that you don't know.
    Do not use more than 100 words.

    Here is a question:
    {query}
`;

const mathTemplate = `
    You are a very good mathematician. You are great at answering math questions.
    You are so good because you are able to break down hard problems into their component parts,
    answer the component parts, and then put them together to answer the broader question.
    Do not use more than 100 words.

    Here is a question:
    {query}
`;

const embeddings = new OllamaEmbeddings();

const templates = [physicsTemplate, mathTemplate];

const promptRouter = async (query: string) => {
  const templateEmbeddings = await embeddings.embedDocuments(templates);
  const queryEmbedding = await embeddings.embedQuery(query);

  const similarity = cosineSimilarity([queryEmbedding], templateEmbeddings)[0];

  const isPhysicsQuestion = similarity[0] > similarity[1];

  let promptTemplate: ChatPromptTemplate;
  if (isPhysicsQuestion) {
    console.log("Using Physics Template");
    promptTemplate = ChatPromptTemplate.fromTemplate(physicsTemplate);
  } else {
    console.log("Using math prompt");
    promptTemplate = ChatPromptTemplate.fromTemplate(mathTemplate);
  }

  return promptTemplate.invoke({ query });
};

const chain = RunnableSequence.from([
  promptRouter,
  llm,
  new StringOutputParser(),
]);

const run = async () => {
  const question1 = "What is the speed of light?";
  const response1 = await chain.invoke(question1);

  console.log({ question1, response1 });

  const question2 = "what's a path integral?";
  const response2 = await chain.invoke(question2);

  console.log({ question2, response2 });
};

run();
