import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const parser = new JsonOutputParser();

const chain = model.pipe(parser);

const run = async () => {
  const stream = await chain.stream(
    `Output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key "name" and "population"`
  );

  let finalChunk: Record<string, any> = {};

  for await (const chunk of stream) {
    console.clear();
    console.log(chunk);
    finalChunk = chunk;
  }

  extractCountryNames(finalChunk);

  console.dir({ finalChunk }, { depth: null });
  console.dir(extractCountryNames(finalChunk), { depth: null });
};

const extractCountryNames = (inputs: Record<string, any>) => {
  if (!Array.isArray(inputs.countries)) {
    return "";
  }
  return JSON.stringify(inputs.countries.map((country) => country.name));
};

run();

// json - output - extraction;
