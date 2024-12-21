import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { LengthBasedExampleSelector } from "@langchain/core/example_selectors";

(async function run() {
  const examplePrompt = new PromptTemplate({
    inputVariables: ["input", "output"],
    template: "Input: {input}\nOutput: {output}",
  });

  const exampleSelector = await LengthBasedExampleSelector.fromExamples(
    [
      { input: "happy", output: "sad" },
      { input: "tall", output: "short" },
      { input: "energetic", output: "lethargic" },
      { input: "sunny", output: "gloomy" },
      { input: "windy", output: "calm" },
    ],
    {
      examplePrompt,
      maxLength: 25,
    }
  );

  const dynamicPrompt = new FewShotPromptTemplate({
    exampleSelector,
    examplePrompt,
    prefix: "Given the antonym of every input",
    suffix: "Input: {adjective} \n Output: {output}",
    inputVariables: ["adjective"],
  });

  console.log(await dynamicPrompt.format({ adjective: "happy" }));
})();
