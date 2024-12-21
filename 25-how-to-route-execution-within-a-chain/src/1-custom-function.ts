import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

import { ChatOllama } from "@langchain/ollama";
import { AIMessage } from "@langchain/core/messages";

const promptTemplate = ChatPromptTemplate.fromTemplate(`
    Given the user question below, classify it as either being about \`langchain\` \`Antropic\`, or \`Other\`.

    Do not response with more than one word.

    <question>
    {question}
    </question>

    Classification:
`);

const model = new ChatOllama({
  model: "llama3.2",
});

const classificationChain = RunnableSequence.from([
  promptTemplate,
  model,
  new StringOutputParser(),
]);

const run1 = async () => {
  const response = await classificationChain.invoke({
    question: "How do I call AI ?",
  });

  console.log(response);
};

// run1();

const langchainChain = ChatPromptTemplate.fromTemplate(
  `
    You are expert in langchain. Always answer question starting with "As Harrison Chase told me". 
    Response to the following question.
    
    Question: {question}
    Answer: 
`
).pipe(model);

const anthropicChain = ChatPromptTemplate.fromTemplate(
  `
    You are an expert in anthropic. Always answer question starting with "As Dario  told me". 
    Response to the following question:

    Question: {question}
    Answer:
    `
).pipe(model);

const generalChain = ChatPromptTemplate.fromTemplate(
  `
    Response to the following question:

    Question: {question}
    Answer:
`
).pipe(model);

const route = ({ topic }: { question: string; topic: string }) => {
  console.log({ topic });

  if (topic.toLowerCase() === "langchain") {
    return langchainChain;
  } else if (topic.toLowerCase() === "anthropic") {
    return anthropicChain;
  } else {
    return generalChain;
  }
};

const fullChain = RunnableSequence.from([
  {
    topic: classificationChain,
    question: ({ question }: { question: string }) => question,
  },
  route,
]);

const run = async () => {
  /* ------------------------------------ 1 ----------------------------------- */
  const question1 = "how do I use Anthropic?";

  const response = await fullChain.invoke({
    question: question1,
  });

  console.log(question1, "  response > ", response);
  /* ------------------------------------ 2 ----------------------------------- */
  const question2 = "how do I use LangChain?";

  const response2 = await fullChain.invoke({
    question: question2,
  });

  console.log(question2, "  response > ", response2);

  /* ------------------------------------ 3 ----------------------------------- */
  const question3 = "what is 2 + 2?";

  const response3 = await fullChain.invoke({
    question: question3,
  });

  console.log(question3, "  response > ", response3);
};

run();
