import { ChatOllama } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";

(async function () {
  const model = new ChatOllama({
    model: "llama3.2",
    cache: true,
  });

  //   const model = new ChatOpenAI({
  //     model: "gpt-3.5-turbo",
  //     cache: true,
  //   });

  console.time("first call");

  // The first time, it is not yet in cache, so it should take longer
  const res1 = await model.invoke("introduce yourself");
  console.log(res1.content);
  console.timeEnd("first call");

  console.time("second call");

  const res2 = await model.invoke("introduce yourself");
  console.log(res2.content);

  console.timeEnd("second call");
})();
