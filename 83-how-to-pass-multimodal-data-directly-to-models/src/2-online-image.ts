import * as fs from "node:fs/promises";
import { ChatOllama } from "@langchain/ollama";
import { HumanMessage } from "@langchain/core/messages";

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
          //   url: imageUrl,
          url: `data:image/jpeg;base64,${imageData.toString("base64")}`,
        },
      },
    ],
  });
  const response = await model.invoke([message]);
  console.log(response.content);
})();
