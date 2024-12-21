import * as fs from "node:fs/promises";
import { ChatOllama } from "@langchain/ollama";
import { HumanMessage } from "@langchain/core/messages";

(async function () {
  const model = new ChatOllama({
    model: "llama3.2-vision",
  });

  const imageData = await fs.readFile("./hotdog.jpg");

  const message = new HumanMessage({
    content: [
      {
        type: "text",
        text: "what does this image contain?",
      },
      {
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${imageData.toString("base64")}`,
        },
      },
    ],
  });

  const response = await model.invoke([message]);

  console.log(response.content);
})();
