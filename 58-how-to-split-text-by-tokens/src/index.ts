import { TokenTextSplitter } from "@langchain/textsplitters";
import * as fs from "node:fs";

(async function () {
  const rawData = await fs.readFileSync("./state_of_the_union.txt");

  const stateOfTheUnion = rawData.toString();

  const textSplitter = new TokenTextSplitter({
    chunkSize: 10,
    chunkOverlap: 0,
  });

  const docs = await textSplitter.createDocuments([stateOfTheUnion]);

  console.log(docs.splice(0, 3));
})();
