import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import { zodToJsonSchema } from "zod-to-json-schema";

const tool = new WikipediaQueryRun({
  topKResults: 1,
  maxDocContentLength: 100,
});

console.log({ toolName: tool.name });
console.log({ toolDescription: tool.description });
console.log({ toolSchema: tool.schema });
console.dir({ toolSchema: zodToJsonSchema(tool.schema) }, { depth: null });
console.dir({ returnDirect: tool.returnDirect });

(async function () {
  const response = await tool.invoke("langchain");
  console.log({ response });
})();
