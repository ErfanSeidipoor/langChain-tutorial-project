import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";

const llm = new ChatOpenAI({ model: "gpt-3.5-turbo-0125", temperature: 0 });

import { Document } from "@langchain/core/documents";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { z } from "zod";

(async function () {
  const documents = [
    new Document({
      pageContent:
        "Dogs are great companions, known for their loyalty and friendliness.",
    }),
    new Document({
      pageContent:
        "Cats are independent pets that often enjoy their own space.",
    }),
  ];

  const vectorstore = await MemoryVectorStore.fromDocuments(
    documents,
    new OpenAIEmbeddings()
  );

  const retriever = vectorstore.asRetriever({
    k: 1,
    searchType: "similarity",
  });

  const SYSTEM_TEMPLATE = `
You are an assistant for question-answering tasks.
Use the below context to answer the question. If
you don't know the answer, say you don't know.
Use three sentences maximum and keep the answer
concise.

Answer in the style of {answer_style}.

Context: {context}`;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_TEMPLATE],
    ["human", "{question}"],
  ]);

  const ragChain = RunnableSequence.from([
    {
      context: (input, config) => retriever.invoke(input.question, config),
      question: (input) => input.question,
      answer_style: (input) => input.answer_style,
    },
    prompt,
    llm,
    new StringOutputParser(),
  ]);

  const ragTool = ragChain.asTool({
    name: "pet_expert",
    description: "Get information about pets.",
    schema: z.object({
      context: z.string(),
      question: z.string(),
      answer_style: z.string(),
    }),
  });

  const agent = createReactAgent({ llm: llm, tools: [ragTool] });

  const stream = await agent.stream({
    messages: [["human", "What would a pirate say dogs are known for?"]],
  });

  for await (const chunk of stream) {
    // Log output from the agent or tools node
    if (chunk.agent) {
      console.log("AGENT:", chunk.agent.messages[0]);
    } else if (chunk.tools) {
      console.log("TOOLS:", chunk.tools.messages[0]);
    }
    console.log("----");
  }
})();
