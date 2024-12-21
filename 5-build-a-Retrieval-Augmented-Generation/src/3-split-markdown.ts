import "cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

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

const mdSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
  chunkSize: 60,
  chunkOverlap: 0,
});

const run = async () => {
  console.log({ mdSplitter });

  const mdDocs = await mdSplitter.createDocuments([markdownText]);

  console.log({ mdDocs });
};
run();
