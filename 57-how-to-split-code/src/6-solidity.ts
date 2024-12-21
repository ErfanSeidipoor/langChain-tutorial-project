import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

(async function () {
  console.log(RecursiveCharacterTextSplitter.getSeparatorsForLanguage("sol"));

  const SOL_CODE = `
    pragma solidity ^0.8.20;
      contract HelloWorld {
     function add(uint a, uint b) pure public returns(uint) {
         return a + b;
     }
  }
  `;

  const solSplitter = RecursiveCharacterTextSplitter.fromLanguage("sol", {
    chunkSize: 60,
    chunkOverlap: 0,
  });

  const solDocs = await solSplitter.createDocuments([SOL_CODE]);

  console.log(solDocs);
})();
