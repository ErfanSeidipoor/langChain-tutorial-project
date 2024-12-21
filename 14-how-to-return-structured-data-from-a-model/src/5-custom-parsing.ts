import { AIMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { RunnableLambda } from "@langchain/core/runnables";

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

const schema = `{{ people: [ {{ name:"string", height_in_meters: "number"}} ]  }}`;
const query = "Anna is 23 years old and she is y6 feet tall";

const extractJSON = (output: AIMessage): People[] => {
  const text = output.content as string;
  const pattern = /```json(.*?)```/gs;

  const matches = text.match(pattern);

  try {
    return (
      matches?.map((match) => {
        // Remove the markdown code block syntax to isolate the JSON string
        const jsonStr = match.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonStr);
      }) ?? []
    );
  } catch (error) {
    throw new Error(`Failed to parse: ${output}`);
  }
};

const run = async () => {
  const prompt = await ChatPromptTemplate.fromMessages([
    [
      "system",
      // prettier-ignore
      "Answer the user query. wrap the output in JSON that matches the given schema: \`\`\`json\n {schema} \`\`\`.  \n Make sure to wrap the answer in \`\`\`json  and \`\`\` tags",
    ],
    ["human", "{query}"],
  ]).partial({
    schema,
  });

  const response = (await prompt.format({ query })).toString();
  console.log({ response });

  const chain = prompt
    .pipe(model)
    .pipe(new RunnableLambda({ func: extractJSON }));

  const output = await chain.invoke({ query });

  console.dir(
    output.map((people) => people.people),
    { depth: null }
  );
};

run();
