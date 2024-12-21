import { initChatModel } from "langchain/chat_models/universal";

(async function () {
  const gpt4o = await initChatModel("gpt-4o", {
    modelProvider: "openai",
    temperature: 0.5,
  });

  const claudeOpus = await initChatModel("claude-3-opus-20240229", {
    modelProvider: "anthropic",
    temperature: 0,
  });

  const gemini15 = await initChatModel("gemini-1.5-pro", {
    modelProvider: "google-vertexai",
    temperature: 0,
  });

  console.log(`GPT-4o: ${(await gpt4o.invoke("what's your name")).content}`);

  console.log(
    `Claude Opus: ${(await claudeOpus.invoke("what's your name")).content}`
  );

  console.log(
    `Gemini 1.5: ${(await gemini15.invoke("what's your name")).content}`
  );

  const configurableModel = await initChatModel(undefined, { temperature: 0 });

  const gpt4Res = await configurableModel.invoke("what's your name", {
    configurable: { model: "gpt-4o" },
  });
  console.log("gpt4Res: ", gpt4Res.content);

  const claudeRes = await configurableModel.invoke("what's your name", {
    configurable: { model: "claude-3-5-sonnet-20240620" },
  });
  console.log("claudeRes: ", claudeRes.content);
})();
