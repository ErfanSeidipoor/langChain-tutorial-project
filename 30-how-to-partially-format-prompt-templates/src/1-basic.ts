import { PromptTemplate } from "@langchain/core/prompts";

const prompt1 = new PromptTemplate({
  template: "{foo} {bar}",
  inputVariables: ["foo", "bar"],
});

const prompt2 = new PromptTemplate({
  template: "{foo} {bar}",
  inputVariables: ["bar"],
  partialVariables: {
    foo: "Hello",
  },
});

const run = async () => {
  const partialPrompt1 = await prompt1.partial({
    foo: "Hello",
  });

  const formattedPrompt1 = await partialPrompt1.format({
    bar: "Baz",
  });

  console.log({ partialPrompt1, formattedPrompt1 });

  const formattedPrompt2 = await prompt2.format({
    bar: "baz",
    foo: "HI",
  });

  console.log({ formattedPrompt2 });
};

run();
