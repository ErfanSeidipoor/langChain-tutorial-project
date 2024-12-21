import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { SemanticSimilarityExampleSelector } from "@langchain/core/example_selectors";
import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { OllamaEmbeddings } from "@langchain/ollama";

(async function run() {
  const examplePrompt = PromptTemplate.fromTemplate(
    "Input: {input}\nOutput: {output}"
  );

  const exampleSelector = await SemanticSimilarityExampleSelector.fromExamples(
    [
      { input: "happy", output: "sad" },
      { input: "tall", output: "short" },
      { input: "energetic", output: "lethargic" },
      { input: "sunny", output: "gloomy" },
      { input: "windy", output: "calm" },
    ],
    new OllamaEmbeddings(),
    HNSWLib,
    { k: 1 }
  );

  const dynamicPrompt = new FewShotPromptTemplate({
    exampleSelector,
    examplePrompt,
    prefix: "Give the antonym of every input",
    suffix: "Input: {adjective}\nOutput:",
    inputVariables: ["adjective"],
  });

  console.log(await dynamicPrompt.format({ adjective: "happy" }));
  console.log(await dynamicPrompt.format({ adjective: "large" }));
})();
