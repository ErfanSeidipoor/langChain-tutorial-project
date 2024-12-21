import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

(async function () {
  const model = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  type Person = {
    name: string;
    height_in_meters: number;
  };

  type People = {
    people: Person[];
  };

  const formatInstructions = `
        Response only in validJSon.
        The JSON object you return should math the following schema:
        {{ people: [{{name:"string", height_in_meters: "number"}}] }}
    
        where people is an array of object, each with a name nad height_in_meters property.
    
    `;

  const parser = new JsonOutputParser<People>();

  const prompt = await ChatPromptTemplate.fromMessages([
    [
      "system",
      "answer the user query. wrap the output in `json` tags \n {format_instructions}",
    ],
    ["human", "{query}"],
  ]).partial({ format_instructions: formatInstructions });

  const query = "Anna is 23 years old and she is 6 feet tall";

  console.log(await prompt.format({ query }));

  const chain = await prompt.pipe(model);

  const response = await chain.invoke({ query });
  console.log(response.content);

  const responseWithParser = await chain.pipe(parser).invoke({ query });
  console.log(responseWithParser);
})();
