import { ChatOpenAI } from "@langchain/openai";

(async function () {
  // const model = new ChatOllama({
  //   model: "llama3.2",
  //   temperature: 0,
  // });

  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  interface IJoke {
    setup: string;
    punchline: string;
  }

  const query = "Generate the shortened filmograph for Tom Hanks";

  const result = await model.invoke(
    query + ` Please enclose the movies in "movie" tags.`
  );

  console.log(result.content);
})();
