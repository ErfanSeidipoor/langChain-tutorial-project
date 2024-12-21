import { ChatOllama } from "@langchain/ollama";
import { Redis } from "ioredis";
import { RedisCache } from "@langchain/community/caches/ioredis";

(async function () {
  const client = new Redis("redis://localhost:6379");
  const cache = new RedisCache(client, {
    ttl: 60,
  });

  const model = new ChatOllama({
    model: "llama3.2",
    cache,
  });

  const response1 = await model.invoke("Do something random!");
  console.log(response1.content);

  const response2 = await model.invoke("Do something random!");
  console.log(response2.content);

  await client.disconnect();
})();
