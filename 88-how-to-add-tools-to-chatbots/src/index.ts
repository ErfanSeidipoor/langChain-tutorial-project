import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { BaseMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";

(async function () {
  const llm = new ChatOllama({
    model: "llama3.2",
  });

  // const llm = new ChatOpenAI({
  //   model: "gpt-4o-mini",
  //   temperature: 0,
  // });

  const tools = [
    new TavilySearchResults({
      maxResults: 1,
    }),
  ];

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful assistant. You may not need to use tools for every query - the user may just want to chat!",
    ],
  ]);

  const agent = createReactAgent({
    llm,
    tools,
    messageModifier: prompt,
  });

  const response1 = await agent.invoke({
    messages: [{ role: "user", content: "I'm Nemo!" }],
  });

  console.log({ response1 });

  const response2 = await agent.invoke({
    messages: [
      {
        role: "user",
        content:
          "What is the current conservation status of the Great Barrier Reef?",
      },
    ],
  });

  console.log({ response2 });

  const response3 = await agent.invoke({
    messages: [
      { role: "user", content: "I'm Nemo!" },
      { role: "user", content: "Hello Nemo! How can I assist you today?" },
      { role: "user", content: "What is my name?" },
    ],
  });

  console.log({ response3 });

  const memory = new MemorySaver();
  const agent2 = createReactAgent({
    llm,
    tools,
    messageModifier: prompt,
    checkpointSaver: memory,
  });

  const response4 = await agent2.invoke(
    { messages: [{ role: "user", content: "I'm Nemo!" }] },
    { configurable: { thread_id: "1" } }
  );

  console.log({ response4 });

  const response5 = await agent2.invoke(
    { messages: [{ role: "user", content: "What is my name?" }] },
    { configurable: { thread_id: "1" } }
  );

  console.log({ response5 });
})();
