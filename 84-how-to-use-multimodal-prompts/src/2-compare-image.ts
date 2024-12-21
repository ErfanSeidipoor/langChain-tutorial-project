import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";
import axios from "axios";

(async function () {
  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg";

  const axiosRes = await axios.get(imageUrl, { responseType: "arraybuffer" });

  const base64 = btoa(
    new Uint8Array(axiosRes.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  const model = new ChatOllama({
    model: "llama3.2-vision",
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "compare the two pictures provided"],
    [
      "user",
      [
        {
          type: "image_url",
          image_url: { url: "data:image/jpeg;base64,{imageData1}" },
        },
        {
          type: "image_url",
          image_url: { url: "data:image/jpeg;base64,{imageData2}" },
        },
      ],
    ],
  ]);

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    imageData2: base64,
    imageData1: base64,
  });

  console.log(response.content);
})();
