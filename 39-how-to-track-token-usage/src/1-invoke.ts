import { ChatOllama } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
});

// const model = new ChatOpenAI({
//   model: "gpt-3.5-turbo",
// });

(async function () {
  const question = "introduce yourself";
  const response = await model.invoke(question);

  console.log({ question, response: response.content });
  console.log("usage_metadata: ", response.usage_metadata);
  console.log("response_metadata: ", response.response_metadata);
})();
