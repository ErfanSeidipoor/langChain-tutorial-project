import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings, ChatOllama } from "@langchain/ollama";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { Document } from "@langchain/core/documents";
import { SemanticSimilarityExampleSelector } from "@langchain/core/example_selectors";

(async function run() {
  const embeddings = new OllamaEmbeddings();

  const memoryVectorStore = new MemoryVectorStore(embeddings);

  const examples = [
    {
      query: "healthy food",
      output: `lettuce`,
      food_type: "vegetable",
    },
    {
      query: "healthy food",
      output: `schnitzel`,
      food_type: "veal",
    },
    {
      query: "foo",
      output: `bar`,
      food_type: "baz",
    },
  ];

  const exampleSelector = new SemanticSimilarityExampleSelector({
    vectorStore: memoryVectorStore,
    k: 2,
    inputKeys: ["query"],
    filter: (doc: Document) => doc.metadata.food_type === "vegetable",
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
    suffix: "User question:\n{query}",
    inputVariables: ["query"],
  });

  const model = new ChatOllama({ model: "llama3.2" });

  const chain = dynamicPrompt.pipe(model);

  const result = await chain.invoke({
    query: "What is exactly one type of healthy food?",
  });
  console.log(result);
})();
