import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import * as fs from "node:fs";

(async function () {
  const rawData = await fs.readFileSync("./state_of_the_union.txt");
  const stateOfTheUnion = rawData.toString();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
    separators: ["\n\n"],
  });

  const docs = await textSplitter.createDocuments([stateOfTheUnion]);

  console.log(docs.splice(0, 4), { depth: null });

  const chunks = await textSplitter.splitText(stateOfTheUnion);

  console.log("chunks[0] > ", chunks[0]);
})();
