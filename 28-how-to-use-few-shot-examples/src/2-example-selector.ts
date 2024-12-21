import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { SemanticSimilarityExampleSelector } from "@langchain/core/example_selectors";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";

const examplePrompt = PromptTemplate.fromTemplate(`
  Question: {question} \n{answer}
  `);

const examples = [
  {
    question: "Who lived longer, Muhammad Ali or Alan Turing?",
    answer: `
  Are follow up questions needed here: Yes.
  Follow up: How old was Muhammad Ali when he died?
  Intermediate answer: Muhammad Ali was 74 years old when he died.
  Follow up: How old was Alan Turing when he died?
  Intermediate answer: Alan Turing was 41 years old when he died.
  So the final answer is: Muhammad Ali
  `,
  },
  {
    question: "When was the founder of craigslist born?",
    answer: `
  Are follow up questions needed here: Yes.
  Follow up: Who was the founder of craigslist?
  Intermediate answer: Craigslist was founded by Craig Newmark.
  Follow up: When was Craig Newmark born?
  Intermediate answer: Craig Newmark was born on December 6, 1952.
  So the final answer is: December 6, 1952
  `,
  },
  {
    question: "Who was the maternal grandfather of George Washington?",
    answer: `
  Are follow up questions needed here: Yes.
  Follow up: Who was the mother of George Washington?
  Intermediate answer: The mother of George Washington was Mary Ball Washington.
  Follow up: Who was the father of Mary Ball Washington?
  Intermediate answer: The father of Mary Ball Washington was Joseph Ball.
  So the final answer is: Joseph Ball
  `,
  },
  {
    question:
      "Are both the directors of Jaws and Casino Royale from the same country?",
    answer: `
  Are follow up questions needed here: Yes.
  Follow up: Who is the director of Jaws?
  Intermediate Answer: The director of Jaws is Steven Spielberg.
  Follow up: Where is Steven Spielberg from?
  Intermediate Answer: The United States.
  Follow up: Who is the director of Casino Royale?
  Intermediate Answer: The director of Casino Royale is Martin Campbell.
  Follow up: Where is Martin Campbell from?
  Intermediate Answer: New Zealand.
  So the final answer is: No
  `,
  },
];

const run = async () => {
  const exampleSelector = await SemanticSimilarityExampleSelector.fromExamples(
    examples,
    new OllamaEmbeddings({}),
    MemoryVectorStore,
    {
      k: 1,
    }
  );

  const question = "Who was the father of Mary Ball Washington?";
  const selectedExamples = await exampleSelector.selectExamples({ question });

  console.log(`Examples most similar to the input: ${question}`);
  for (const example of selectedExamples) {
    console.log("\n");
    console.log(
      Object.entries(example)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")
    );
  }

  const prompt = new FewShotPromptTemplate({
    examples: selectedExamples,
    examplePrompt,
    suffix: "Question: {input}",
    inputVariables: ["input"],
  });

  const formatted = await prompt.format({
    input: question,
  });

  console.log(formatted.toString());
};

run();
