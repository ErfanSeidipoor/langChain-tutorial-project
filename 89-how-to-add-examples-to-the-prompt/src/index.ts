import { BaseMessage, HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOllama } from "@langchain/ollama";
import { z } from "zod";

import { AIMessage, ToolMessage } from "@langchain/core/messages";
import { randomUUID } from "crypto";

const toolExampleToMessages = (
  example: Record<string, any>
): Array<BaseMessage> => {
  const messages: Array<BaseMessage> = [
    new HumanMessage({ content: example.input }),
  ];
  const openaiToolCalls = example.toolCalls.map((toolCall: string[]) => {
    return {
      id: randomUUID(),
      type: "function" as const,
      function: {
        name: "search",
        arguments: JSON.stringify(toolCall),
      },
    };
  });

  messages.push(
    new AIMessage({
      content: "",
      additional_kwargs: { tool_calls: openaiToolCalls },
    })
  );

  const toolOutputs =
    "toolOutputs" in example
      ? example.toolOutputs
      : Array(openaiToolCalls.length).fill(
          "You have correctly called this tool."
        );
  toolOutputs.forEach((output: string, index: number) => {
    messages.push(
      new ToolMessage({
        content: output,
        tool_call_id: openaiToolCalls[index].id,
      })
    );
  });

  return messages;
};

(async function () {
  const subQueriesDescription = `
If the original question contains multiple distinct sub-questions,
or if there are more generic questions that would be helpful to answer in
order to answer the original question, write a list of all relevant sub-questions.
Make sure this list is comprehensive and covers all parts of the original question.
It's ok if there's redundancy in the sub-questions, it's better to cover all the bases than to miss some.
Make sure the sub-questions are as narrowly focused as possible in order to get the most relevant results.`;

  const searchSchema = z.object({
    query: z
      .string()
      .describe(
        "Primary similarity search query applied to video transcripts."
      ),
    subQueries: z.array(z.string()).optional().describe(subQueriesDescription),
  });

  const llm = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const system = `You are an expert at converting user questions into database queries.
You have access to a database of tutorial videos about a software library for building LLM-powered applications.
Given a question, return a list of database queries optimized to retrieve the most relevant results.

If there are acronyms or words you are not familiar with, do not try to rephrase them.`;

  const llmWithTools = llm.withStructuredOutput(searchSchema, {
    name: "Search",
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", system],
    ["placeholder", "{examples}"],
    ["human", "{question}"],
  ]);

  const queryAnalyzer = RunnableSequence.from([
    {
      question: new RunnablePassthrough(),
    },
    prompt,
    llmWithTools,
  ]);

  const examples = [];

  {
    const question = "What's chat langchain, is it a langchain template?";
    const query = {
      query: "What is chat langchain and is it a langchain template?",
      subQueries: ["What is chat langchain", "What is a langchain template"],
    };
    examples.push({ input: question, toolCalls: [query] });
  }

  {
    const question2 =
      "How to build multi-agent system and stream intermediate steps from it";
    const query2 = {
      query:
        "How to build multi-agent system and stream intermediate steps from it",
      subQueries: [
        "How to build multi-agent system",
        "How to stream intermediate steps from multi-agent system",
        "How to stream intermediate steps",
      ],
    };

    examples.push({ input: question2, toolCalls: [query2] });
  }

  {
    const question3 = "LangChain agents vs LangGraph?";
    const query3 = {
      query:
        "What's the difference between LangChain agents and LangGraph? How do you deploy them?",
      subQueries: [
        "What are LangChain agents",
        "What is LangGraph",
        "How do you deploy LangChain agents",
        "How do you deploy LangGraph",
      ],
    };
    examples.push({ input: question3, toolCalls: [query3] });
  }

  const exampleMessages = examples
    .map((ex) => toolExampleToMessages(ex))
    .flat();

  const queryAnalyzerWithExamples = RunnableSequence.from([
    {
      question: new RunnablePassthrough(),
      examples: () => exampleMessages,
    },
    prompt,
    llmWithTools,
  ]);

  const response = await queryAnalyzerWithExamples.invoke(
    "what's the difference between web voyager and reflection agents? do both use langgraph?"
  );

  console.log({ response });
})();
