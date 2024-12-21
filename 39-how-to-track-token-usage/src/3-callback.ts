import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
  callbacks: [
    {
      handleLLMEnd: (output) => {
        console.log(JSON.stringify(output, null, 2));
      },
    },
  ],
});

(async function () {
  await model.invoke("Hello, how are you?");
})();
