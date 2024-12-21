import {
  PromptTemplate,
  PipelinePromptTemplate,
} from "@langchain/core/prompts";

const fullPrompt = PromptTemplate.fromTemplate(`
  {introduction}
  {example}
  {start}
`);

const introductionPrompt = PromptTemplate.fromTemplate(
  "You are impersonating {person}"
);

const examplePrompt = PromptTemplate.fromTemplate(`
  Here's an example of interaction: 
  Q: {example_q}
  A: {example_a}
`);

const startPrompt = PromptTemplate.fromTemplate(`
  Now, do this for real!
  Q: {input}
  A:
`);

const composedPrompt = new PipelinePromptTemplate({
  pipelinePrompts: [
    {
      name: "introduction",
      prompt: introductionPrompt,
    },
    {
      name: "example",
      prompt: examplePrompt,
    },
    {
      name: "start",
      prompt: startPrompt,
    },
  ],
  finalPrompt: fullPrompt,
});

const run = async () => {
  const formattedPrompt = await composedPrompt.format({
    person: "Elon Musk",
    example_q: `What's your favorite car?`,
    example_a: "Telsa",
    input: `What's your favorite social media site?`,
  });

  console.log(formattedPrompt);
};
run();
