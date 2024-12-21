import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createRetrieverTool } from "langchain/tools/retriever";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import { randomUUID } from "crypto";

(async function () {
  const llm = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const loader = new CheerioWebBaseLoader(
    "https://lilianweng.github.io/posts/2023-06-23-agent/"
  );

  const docs = await loader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splits = await textSplitter.splitDocuments(docs);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new OllamaEmbeddings()
  );

  const retriever = vectorStore.asRetriever();

  const tool = createRetrieverTool(retriever, {
    name: "blog_post_retriever",
    description:
      "Searches and returns excerpts from the Autonomous Agents blog post.",
  });

  const tools = [tool];

  const memory = new MemorySaver();

  const agentExecutor = createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
  });

  const threadId = randomUUID();
  const config = { configurable: { thread_id: threadId } };

  for await (const s of await agentExecutor.stream(
    { messages: [{ role: "user", content: "Hi! I'm bob" }] },
    config
  )) {
    console.log(s);
    console.log("----");
  }

  const query2 = "What is Task Decomposition?";

  for await (const s of await agentExecutor.stream(
    { messages: [{ role: "user", content: query2 }] },
    config
  )) {
    console.log(s);
    console.log("----");
  }

  const query3 =
    "What according to the blog post are common ways of doing it? redo the search";

  for await (const s of await agentExecutor.stream(
    { messages: [{ role: "user", content: query3 }] },
    config
  )) {
    console.log(s);
    console.log("----");
  }
})();
