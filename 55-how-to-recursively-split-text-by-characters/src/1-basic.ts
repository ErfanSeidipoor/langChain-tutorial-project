import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const text = `Hi.\n\nI'm Harrison.\n\nHow? Are? You?\nOkay then f f f f.
This is a weird text to write, but gotta test the splittingggg some how.\n\n
Bye!\n\n-H.`;

const text2 = `abcdefghigklmnopqrstuvwxyz0123456789abcdefghigklmnopqrstuvwxyz0123456789`;

console.log(text);

(async function () {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10,
    chunkOverlap: 1,
  });

  const docs = await splitter.createDocuments([text]);

  console.log(docs);
})();
