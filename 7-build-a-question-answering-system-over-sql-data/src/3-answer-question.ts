import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { createSqlQueryChain } from "langchain/chains/sql_db";
import { SqlDatabase } from "langchain/sql_db";
import { QuerySqlTool } from "langchain/tools/sql";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./Chinook_Sqlite.sqlite",
});
// https://github.com/lerocha/chinook-database/blob/master/ChinookDatabase/DataSources/Chinook_Sqlite.sqlite

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

const run = async () => {
  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: dataSource,
  });

  const executeQuery = new QuerySqlTool(db);
  const writeQuery = await createSqlQueryChain({
    llm,
    db,
    dialect: "sqlite",
  });

  const answerPrompt =
    PromptTemplate.fromTemplate(`Given the following user question, corresponding SQL query, and SQL result, answer the user question.

    Question: {question}
    SQL Query: {query}
    SQL Result: {result}
    Answer: 
`);

  const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

  const chain = RunnableSequence.from([
    RunnablePassthrough.assign({ query: writeQuery }).assign({
      result: (i: { query: string }) => executeQuery.invoke(i.query),
    }),
    answerChain,
  ]);

  const response = await chain.invoke({
    question: "How many employees are there?",
  });

  console.log({ response });
};

run();
