import { AIMessage } from "@langchain/core/messages";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableLambda } from "@langchain/core/runnables";
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

  const parser = new JsonOutputParser<People>();

  const schema = `{{ "people": [{{ name: "string", height_in_meters: "number" }}] }}`;

  const prompt = await ChatPromptTemplate.fromMessages([
    [
      "system",
      `Answer the user query. Output your answer as JSON that matches the given schema: 
      \`\`\`json\n{schema}\n\`\`\`.
      Make sure to wrap the answer in \`\`\`json and \`\`\` tags`,
    ],
    ["human", "{query}"],
  ]).partial({
    schema,
  });

  const customJSonPeopleParser = (output: AIMessage): People[] => {
    const text = output.content as string;

    const pattern = /```json(.*?)```/gs;
    const matches = text.match(pattern);

    console.log({ text, matches });
    try {
      return (
        matches?.map((match) => {
          const jsonStr = match
            .replace(/{{/g, "{")
            .replace(/}}/g, "}")
            .replace(/\n/g, "")
            .replace(/```json|```/g, "")
            .trim();
          console.log({ jsonStr });

          return JSON.parse(jsonStr);
        }) ?? []
      );
    } catch (error) {
      throw new Error(`Failed to parse: ${output}`);
    }
  };

  const query = "Anna is 23 years old and she is 6 feet tall";

  console.log(await prompt.format({ query }));

  // const chain = await prompt.pipe(model).pipe(customJSonPeopleParser);
  const chain = await prompt
    .pipe(model)
    .pipe(new RunnableLambda({ func: customJSonPeopleParser }));

  const response = await chain.invoke({ query });
  console.log(response[0].people);
})();
