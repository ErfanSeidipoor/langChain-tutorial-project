import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  logprobs: true,
});

(async function () {
  const response = await model.invoke("What is the capital of California?");
  console.log(response.content);
  console.log(response.response_metadata.logprobs.content);

  const stream = await model.stream("What is the capital of California?");
  let aggregateResponse;

  for await (const chunk of stream) {
    if (aggregateResponse === undefined) {
      aggregateResponse = chunk;
    } else {
      aggregateResponse = aggregateResponse.concat(chunk);
    }
    console.log(aggregateResponse.response_metadata.logprobs?.content);
  }
})();
