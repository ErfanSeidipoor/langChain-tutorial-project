import { HumanMessage } from "@langchain/core/messages";
import { ChatOllama } from "@langchain/ollama";
import * as fs from "node:fs/promises";

(async function () {
  const model = new ChatOllama({
    model: "llama3.2-vision",
  });

  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg";

  const imageData = await fs.readFile("./the-nature.jpg");

  const message = new HumanMessage({
    content: [
      {
        type: "text",
        text: "describe the weather in this image",
      },
      {
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${imageData.toString("base64")}`,
        },
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
