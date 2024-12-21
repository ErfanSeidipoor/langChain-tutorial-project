import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

(async function () {
  console.log(
    RecursiveCharacterTextSplitter.getSeparatorsForLanguage("python")
  );

  const PYTHON_CODE = `
  def hello_world():
      print("Hello, World!")
  
  # Call the function
  hello_world()
  `;

  const pythonSplitter = RecursiveCharacterTextSplitter.fromLanguage("python", {
    chunkSize: 60,
    chunkOverlap: 0,
  });

  const pythonDocs = await pythonSplitter.createDocuments([PYTHON_CODE]);

  console.log(pythonDocs);
})();
