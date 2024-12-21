// Ephemeral, in-memory vector store for demo purposes
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings, ChatOllama } from "@langchain/ollama";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { SemanticSimilarityExampleSelector } from "@langchain/core/example_selectors";

(async function run() {
  const embeddings = new OllamaEmbeddings();

  const memoryVectorStore = new MemoryVectorStore(embeddings);

  const examples = [
    {
      query: "healthy food",
      output: `galbi`,
    },
    {
      query: "healthy food",
      output: `schnitzel`,
    },
    {
      query: "foo",
      output: `bar`,
    },
  ];

  const exampleSelector = new SemanticSimilarityExampleSelector({
    vectorStore: memoryVectorStore,
    k: 2,
    inputKeys: ["query"],
  });

  for (const example of examples) {
    await exampleSelector.addExample(example);
  }

  const examplePrompt = PromptTemplate.fromTemplate(`<example>
  <user_input>
    {query}
  </user_input>
  <output>
    {output}
  </output>
</example>`);

  const dynamicPrompt = new FewShotPromptTemplate({
    exampleSelector,
    examplePrompt,
    prefix: `Answer the user's question, using the below examples as reference:`,
    suffix: "User question: {query}",
    inputVariables: ["query"],
  });

  const formattedValue = await dynamicPrompt.format({
    query: "What is a healthy food?",
  });
  console.log(formattedValue);

  const model = new ChatOllama({
    model: "llama3.2",
  });

  const chain = dynamicPrompt.pipe(model);

  const result = await chain.invoke({ query: "What is a healthy food?" });
  console.log(result.content);
})();
