import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import {
  Annotation,
  END,
  MemorySaver,
  messagesStateReducer,
  START,
  StateGraph,
} from "@langchain/langgraph";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { randomUUID } from "crypto";

(async function () {
  const llm = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const contextualizeQSystemPrompt = [
    "Given a chat history and the latest user question",
    "which might reference context in the chat history,",
    "formulate a standalone question which can be understood",
    "without the chat history. Do NOT answer the question,",
    "just reformulate it if needed and otherwise return it as is.",
  ].join(" ");

  const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
    ["system", contextualizeQSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const systemPrompt =
    "You are an assistant for question-answering tasks. " +
    "Use the following pieces of retrieved context to answer " +
    "the question. If you don't know the answer, say that you " +
    "don't know. Use three sentences maximum and keep the " +
    "answer concise." +
    "\n\n" +
    "{context}";

  const qaPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

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

  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm,
    retriever,
    rephrasePrompt: contextualizeQPrompt,
  });

  const questionAnswerChain = await createStuffDocumentsChain({
    llm,
    prompt: qaPrompt,
  });

  const ragChain = await createRetrievalChain({
    retriever: historyAwareRetriever,
    combineDocsChain: questionAnswerChain,
  });

  const GraphAnnotation = Annotation.Root({
    input: Annotation<string>(),
    chat_history: Annotation<BaseMessage[]>({
      reducer: messagesStateReducer,
      default: () => [],
    }),
    context: Annotation<string>(),
    answer: Annotation<string>(),
  });

  async function callModel(state: typeof GraphAnnotation.State) {
    const response = await ragChain.invoke(state);
    return {
      chat_history: [
        new HumanMessage(state.input),
        new AIMessage(response.answer),
      ],
      context: response.context,
      answer: response.answer,
    };
  }

  // Create the workflow
  const workflow = new StateGraph(GraphAnnotation)
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

  // Compile the graph with a checkpointer object
  const memory = new MemorySaver();
  const app = workflow.compile({ checkpointer: memory });

  const threadId = randomUUID();
  const config = { configurable: { thread_id: threadId } };

  const result = await app.invoke(
    { input: "What is Task Decomposition?" },
    config
  );
  console.log(result.answer);

  const result2 = await app.invoke(
    { input: "What is one way of doing it?" },
    config
  );
  console.log(result2.answer);

  const chatHistory = (await app.getState(config)).values.chat_history;
  for (const message of chatHistory) {
    console.log(message);
  }
})();
