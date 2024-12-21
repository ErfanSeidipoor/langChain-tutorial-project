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

(async function () {
  const loader = new CheerioWebBaseLoader(
    "https://docs.smith.langchain.com/user_guide"
  );

  const rawDocs = await loader.load();

  console.log({ length: rawDocs[0].pageContent.length });

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

  const docs = await retriever.invoke("how can langsmith help with testing?");

  console.log(docs);

  const SYSTEM_TEMPLATE = `Answer the user's questions based on the below context. 
If the context doesn't contain any relevant information to the question, don't make something up and just say "I don't know":

<context>
{context}
</context>
`;

  const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_TEMPLATE],
    new MessagesPlaceholder("messages"),
  ]);

  const documentChain = await createStuffDocumentsChain({
    llm: new ChatOllama({ model: "llama3.2", temperature: 0 }),
    prompt: questionAnsweringPrompt,
  });

  const response1 = await documentChain.invoke({
    messages: [
      new HumanMessage("Can LangSmith help test my LLM applications?"),
    ],
    context: docs,
  });

  console.log({ response1 });

  const response2 = await documentChain.invoke({
    messages: [
      new HumanMessage("Can LangSmith help test my LLM applications?"),
    ],
    context: [],
  });

  console.log({ response2 });

  const parseRetrieverInput = (params: { messages: BaseMessage[] }) => {
    return params.messages[params.messages.length - 1].content;
  };

  const retrievalChain = RunnablePassthrough.assign({
    context: RunnableSequence.from([parseRetrieverInput, retriever]),
  }).assign({
    answer: documentChain,
  });

  const response3 = await retrievalChain.invoke({
    messages: [
      new HumanMessage("Can LangSmith help test my LLM applications?"),
    ],
  });

  console.log({ response3 });
})();
