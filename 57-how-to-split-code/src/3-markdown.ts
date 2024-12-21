import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

(async function () {
  console.log(
    RecursiveCharacterTextSplitter.getSeparatorsForLanguage("markdown")
  );

  const markdownText = `
      # 🦜️🔗 LangChain

      ⚡ Building applications with LLMs through composability ⚡

      ## Quick Install

      \`\`\`bash
      # Hopefully this code block isn't split
      pip install langchain
      \`\`\`

      As an open-source project in a rapidly developing field, we are extremely open to contributions.
  `;

  const markdownSplitter = RecursiveCharacterTextSplitter.fromLanguage(
    "markdown",
    {
      chunkSize: 60,
      chunkOverlap: 0,
    }
  );

  const markdownDocs = await markdownSplitter.createDocuments([markdownText]);

  console.log(markdownDocs);
})();
