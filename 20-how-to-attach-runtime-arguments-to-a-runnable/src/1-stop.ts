import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOllama({
  model: "llama3.2",
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Write out the following equation using algebraic symbols then solve it. Use the format\n\n EQUATION:...\n SOLUTION:...\n\n",
  ],
  ["human", "{equation}"],
]);

const runnable1 = prompt.pipe(model).pipe(new StringOutputParser());
const runnable2 = prompt
  .pipe(model.bind({ stop: ["SOLUTION"] }))
  .pipe(new StringOutputParser());

const run = async () => {
  const result1 = await runnable1.invoke({
    equation: "x raised to the third plus seven equals 12",
  });
  console.log("runnable1 --------------- :\n", result1);

  const result2 = await runnable2.invoke({
    equation: "x raised to the third plus seven equals 12",
  });
  console.log("runnable2 --------------- :\n", result2);
};

run();
