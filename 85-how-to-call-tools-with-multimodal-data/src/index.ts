import { HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";
import axios from "axios";
import { z } from "zod";

(async function () {
  const weatherTool = tool(
    async ({ weather }) => {
      console.log(weather);
      return weather;
    },
    {
      name: "multiply",
      description: "Describe the weather",
      schema: z.object({
        weather: z.enum(["sunny", "cloudy", "rainy"]),
      }),
    }
  );
  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg";

  const axiosRes = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64 = btoa(
    new Uint8Array(axiosRes.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  const message = new HumanMessage({
    content: [
      {
        type: "text",
        text: "describe the weather in this image",
      },
      {
        type: "image_url",
        image_url: { url: `data:image/jpeg;base64,${base64}` },
      },
    ],
  });

  const model = new ChatOllama({
    model: "llama3.2-vision",
  }).bindTools([weatherTool]);

  const response = await model.invoke([message]);

  console.log(response.tool_calls);
})();
