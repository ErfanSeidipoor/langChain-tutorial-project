import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

const prompt = ChatPromptTemplate.fromTemplate(
  "Write a comma-separated list of 5 animals similar to {animal}. Do not include numbers and dot at the end."
);
const model = new ChatOllama({ model: "llama3.2" });

const strChain = prompt.pipe(model).pipe(new StringOutputParser());
const listChain = strChain.pipe(splitIntoList);

const run = async () => {
  const stream = await listChain.stream({ animal: "bear" });

  for await (const chunk of stream) {
    console.log("1", { chunk });
  }
};

run();

// async function* splitIntoList(input: string) {
//   // hold partial input until we get a comma
//   let buffer = "";
//   for await (const chunk of input) {
//     // add current chunk to buffer
//     buffer += chunk;
//     // while there are commas in the buffer
//     while (buffer.includes(",")) {
//       // split buffer on comma
//       const commaIndex = buffer.indexOf(",");
//       // yield everything before the comma
//       yield [buffer.slice(0, commaIndex).trim()];
//       // save the rest for the next iteration
//       buffer = buffer.slice(commaIndex + 1);
//     }
//   }
//   // yield the last chunk
//   yield [buffer.trim()];
// }

async function* splitIntoList(input: string) {
  const array = [];
  let buffer = "";
  for await (const chunk of input) {
    console.log("0", { chunk });
    // yield chunk;
    if (!chunk) continue;
    if (chunk === ",") {
      yield [`${buffer.trim()}`];
      array.push(buffer);
      buffer = "";
    } else {
      buffer += chunk;
    }
  }
  yield [`${buffer.trim()}`];
}
