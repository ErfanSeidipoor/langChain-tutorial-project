import { CustomExampleSelector } from "./CustomExampleSelector";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
const examples = [
  { input: "hi", output: "ciao" },
  { input: "bye", output: "arrivaderci" },
  { input: "soccer", output: "calcio" },
];

const exampleSelector = new CustomExampleSelector(examples);

const examplePrompt = PromptTemplate.fromTemplate(
  "Input {input} -> Output: {output}"
);

const prompt = new FewShotPromptTemplate({
  exampleSelector,
  examplePrompt,
  suffix: "Input: {input} -> Output:",
  prefix: "Translate the foollowing words from English to Italina:",
  inputVariables: ["input"],
});
const run = async () => {
  await exampleSelector.addExample({ input: "hand", output: "mano" });

  console.log(await prompt.format({ input: "word" }));
};

run();
