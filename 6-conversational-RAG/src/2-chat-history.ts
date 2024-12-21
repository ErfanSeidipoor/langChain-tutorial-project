import { ChatOpenAI } from "@langchain/openai";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";

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

const contextualizeQSystemPrompt =
  "Given a chat history and the latest user question " +
  "which might reference context in the chat history, " +
  "formulate a standalone question which can be understood " +
  "without the chat history. Do NOT answer the question, " +
  "just reformulate it if needed and otherwise return it as is.";

const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
  ["system", contextualizeQSystemPrompt],
  new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
]);

const systemPrompt =
  "You are an assistant for question-answering task. " +
  "Use the following piece of retrieved context to answer the question." +
  "if you don't know the answer, say that you don't know." +
  "Use three sentences maximum and keep the answer concise" +
  "\n\n" +
  "{context}";

const qaPrompt = ChatPromptTemplate.fromMessages([
  ["system", systemPrompt],
  new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
]);

let chatHistory: BaseMessage[] = [];

const run = async () => {
  const docs = await loader.load();
  const splits = await textSplitter.splitDocuments(docs);

  const vectorstore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings()
  );

  const retriever = vectorstore.asRetriever();

  const questionAnswerChain = await createStuffDocumentsChain({
    llm,
    prompt: qaPrompt,
  });

  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm,
    retriever,
    rephrasePrompt: contextualizeQPrompt,
  });

  const ragChain = await createRetrievalChain({
    retriever: historyAwareRetriever,
    combineDocsChain: questionAnswerChain,
  });

  const question = "What is Task Decomposition?";

  const aiMsg1 = await ragChain.invoke({
    input: "What is task Decomposition ?",
    chat_history: chatHistory,
  });

  chatHistory = chatHistory.concat([
    new HumanMessage(question),
    new AIMessage(aiMsg1.answer),
  ]);

  const question2 = "What are common ways of doing it?";

  const aiMsg2 = await ragChain.invoke({
    input: question2,
    chat_history: chatHistory,
  });

  console.dir(aiMsg2.answer);
};

run();
