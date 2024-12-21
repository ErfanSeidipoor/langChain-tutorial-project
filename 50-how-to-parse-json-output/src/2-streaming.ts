// import { ChatOllama } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

(async function () {
  //   const model = new ChatOllama({
  //     model: "llama3.2",
  //     temperature: 0,
  //   });

  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  interface IJoke {
    setup: string;
    punchline: string;
  }

  const jokeQuery = "Tell me a long joke";
  const formatInstructions =
    "Respond with a valid JSON object, containing two fields: 'setup' and 'punchline'.";

  const parser = new JsonOutputParser<IJoke>();

  const prompt = ChatPromptTemplate.fromTemplate(
    "Answer the user query.\n {format_instructions} \n {query}"
  );

  const partialedPrompt = await prompt.partial({
    format_instructions: formatInstructions,
  });

  const chain = partialedPrompt.pipe(model).pipe(parser);

  //   const response = await chain.invoke({ query: jokeQuery });

  //   console.log({ response });

  const stream = await chain.stream({ query: jokeQuery });

  for await (const response of stream) {
    console.log({ response });
  }
})();
