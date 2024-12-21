import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

type Person = {
  name: string;
  height_in_meters: number;
};

type People = {
  people: Person[];
};

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const formatInstructions = `
    Response only in valid JSON format. The JSON object you return should match following schema:

    {{ people: [{{ name: string, height_in_meters: number }}] }}

    where people is an array of objects, each with a name and height_in_meters field
`;

const parser = new JsonOutputParser<People>();

const query = "Anna is 23 years old and she is y6 feet tall";

const run = async () => {
  const prompt = await ChatPromptTemplate.fromMessages([
    [
      "system",
      "Answer the user query. wrap the output in `json` tags \n {format_instructions}",
    ],
    ["human", "{query}"],
  ]).partial({
    format_instructions: formatInstructions,
  });

  //   const response = (await prompt.format({ query })).toString();
  //   console.log({ response });

  console.log((await prompt.pipe(model).invoke({ query })).content);

  const chain = prompt.pipe(model).pipe(parser);
  const people = await chain.invoke({ query });
  console.log(people.people);
};

run();
