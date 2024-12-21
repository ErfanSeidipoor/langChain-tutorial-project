import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { BaseMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { createRetrieverTool } from "langchain/tools/retriever";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import { logAgentMessages } from "../libs/index";

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const loader = new CheerioWebBaseLoader(
  "https://lilianweng.github.io/posts/2023-06-23-agent/",
  {
    selector: ".post-content, .post-title, .post-header",
  }
);

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const memory = new MemorySaver();

const run = async () => {
  const docs = await loader.load();
  const splits = await textSplitter.splitDocuments(docs);
  const vectorstore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings()
  );
  const retriever = vectorstore.asRetriever();

  const tool = createRetrieverTool(retriever, {
    name: "blog_post_retriever",
    description:
      "Searches and Returns excerpts from the autonomous agents blog post.",
  });

  const config = { configurable: { thread_id: "abc123" } };

  // console.log(await tool.invoke({ query }))
  const agentExecutor = createReactAgent({
    llm,
    tools: [tool],
    checkpointSaver: memory,
  });

  const query = "What is Task Decomposition?";
  const response = await agentExecutor.invoke(
    {
      messages: [new HumanMessage(query)],
    },
    config
  );

  logAgentMessages(response);

  const query2 =
    "What according to the blog post are common ways of doing it? redo the search";
  const response2 = await agentExecutor.invoke(
    {
      messages: [new HumanMessage(query2)],
    },
    config
  );

  logAgentMessages(response2);
};

run();
