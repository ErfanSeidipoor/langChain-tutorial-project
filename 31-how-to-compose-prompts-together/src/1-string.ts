import { PromptTemplate } from "@langchain/core/prompts";

const prompt = PromptTemplate.fromTemplate(
  "Tell me a joke about {topic}, make it funny and in {language}"
);

const run = async () => {
  const response = await prompt.format({
    topic: "sports",
    language: "spanish",
  });

  console.log({ response });
};
run();
