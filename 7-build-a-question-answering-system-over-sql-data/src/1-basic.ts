import { ChatOpenAI } from "@langchain/openai";
import { createSqlQueryChain } from "langchain/chains/sql_db";
import { SqlDatabase } from "langchain/sql_db";
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

  const chain = await createSqlQueryChain({
    llm,
    db,
    dialect: "sqlite",
  });

  const sql_query = await chain.invoke({
    question: "How many employees are there?",
  });

  console.log("db run result:", await db.run(sql_query));
};

run();
