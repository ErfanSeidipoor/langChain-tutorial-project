import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  RunnableBranch,
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

(async function () {
  const llm = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const loader = new CheerioWebBaseLoader(
    "https://docs.smith.langchain.com/user_guide"
  );

  const rawDocs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });

  const allSplits = await textSplitter.splitDocuments(rawDocs);

  const vectorstore = await MemoryVectorStore.fromDocuments(
    allSplits,
    new OllamaEmbeddings()
  );

  const retriever = vectorstore.asRetriever(4);

  const SYSTEM_TEMPLATE = `Answer the user's questions based on the below context.
  If the context doesn't contain any relevant information to the question, don't make something up and just say "I don't know":

  // <context>
  // {context}
  // </context>
  // `;

  const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_TEMPLATE],
    new MessagesPlaceholder("messages"),
  ]);

  const documentChain = await createStuffDocumentsChain({
    llm: new ChatOllama({ model: "llama3.2", temperature: 0 }),
    prompt: questionAnsweringPrompt,
  });

  const parseRetrieverInput = (params: { messages: BaseMessage[] }) => {
    return params.messages[params.messages.length - 1].content;
  };

  const queryTransformPrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("messages"),
    [
      "user",
      "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation. Only respond with the query, nothing else.",
    ],
  ]);

  const queryTransformationChain = queryTransformPrompt.pipe(
    new ChatOllama({ model: "llama3.2", temperature: 0 })
  );

  const response1 = await queryTransformationChain.invoke({
    messages: [
      new HumanMessage("Can LangSmith help test my LLM applications?"),
      new AIMessage(
        "Yes, LangSmith can help test and evaluate your LLM applications. It allows you to quickly edit examples and add them to datasets to expand the surface area of your evaluation sets or to fine-tune a model for improved quality or reduced costs. Additionally, LangSmith can be used to monitor your application, log all traces, visualize latency and token usage statistics, and troubleshoot specific issues as they arise."
      ),
      new HumanMessage("Tell me more!"),
    ],
  });

  const queryTransformingRetrieverChain = RunnableBranch.from([
    [
      (params: { messages: BaseMessage[] }) => params.messages.length === 1,
      RunnableSequence.from([parseRetrieverInput, retriever]),
    ],
    queryTransformPrompt
      .pipe(llm)
      .pipe(new StringOutputParser())
      .pipe(retriever),
  ]).withConfig({ runName: "chat_retriever_chain" });

  const conversationalRetrievalChain = RunnablePassthrough.assign({
    context: queryTransformingRetrieverChain,
  }).assign({
    answer: documentChain,
  });

  console.log({ response1 });

  const response2 = await conversationalRetrievalChain.invoke({
    messages: [
      new HumanMessage("Can LangSmith help test my LLM applications?"),
    ],
  });

  console.log({ response2 });

  const response3 = await conversationalRetrievalChain.invoke({
    messages: [
      new HumanMessage("Can LangSmith help test my LLM applications?"),
      new AIMessage(
        "Yes, LangSmith can help test and evaluate your LLM applications. It allows you to quickly edit examples and add them to datasets to expand the surface area of your evaluation sets or to fine-tune a model for improved quality or reduced costs. Additionally, LangSmith can be used to monitor your application, log all traces, visualize latency and token usage statistics, and troubleshoot specific issues as they arise."
      ),
      new HumanMessage("Tell me more!"),
    ],
  });

  console.log({ response3 });

  const stream = await conversationalRetrievalChain.stream({
    messages: [
      new HumanMessage("Can LangSmith help test my LLM applications?"),
      new AIMessage(
        "Yes, LangSmith can help test and evaluate your LLM applications. It allows you to quickly edit examples and add them to datasets to expand the surface area of your evaluation sets or to fine-tune a model for improved quality or reduced costs. Additionally, LangSmith can be used to monitor your application, log all traces, visualize latency and token usage statistics, and troubleshoot specific issues as they arise."
      ),
      new HumanMessage("Tell me more!"),
    ],
  });

  for await (const chunk of stream) {
    console.log(chunk);
  }
})();
