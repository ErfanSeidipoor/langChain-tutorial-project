import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

(async function () {
  console.log(RecursiveCharacterTextSplitter.getSeparatorsForLanguage("html"));

  const htmlText = `
  <!DOCTYPE html>
  <html>
      <head>
          <title>🦜️🔗 LangChain</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
              }
              h1 {
                  color: darkblue;
              }
          </style>
      </head>
      <body>
          <div>
              <h1>🦜️🔗 LangChain</h1>
              <p>⚡ Building applications with LLMs through composability ⚡</p>
          </div>
          <div>
              As an open-source project in a rapidly developing field, we are extremely open to contributions.
          </div>
      </body>
  </html>
  `;

  const htmlSplitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
    chunkSize: 60,
    chunkOverlap: 0,
  });

  const htmlDocs = await htmlSplitter.createDocuments([htmlText]);

  console.log(htmlDocs);
})();
