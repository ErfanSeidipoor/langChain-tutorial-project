import { PromptTemplate } from "@langchain/core/prompts";

const getCurrentDate = () => {
  return new Date().toISOString();
};

const prompt = new PromptTemplate({
  template: "Tell me a {adjective} joke about the day {date}",
  inputVariables: ["adjective", "date"],
});

const run = async () => {
  const partialPrompt = await prompt.partial({
    date: getCurrentDate,
  });

  const formattedPrompt = await partialPrompt.format({
    adjective: "funny",
  });

  console.log({ formattedPrompt });
};

run();
