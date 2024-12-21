import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

(async function () {
  console.log(RecursiveCharacterTextSplitter.getSeparatorsForLanguage("js"));

  const JS_CODE = `
    function helloWorld() {
      console.log("Hello, World!");
    }

    // Call the function
    helloWorld();
`;

  const jsSplitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
    chunkSize: 60,
    chunkOverlap: 0,
  });

  const jsDocs = await jsSplitter.createDocuments([JS_CODE]);

  console.log(jsDocs);
})();
