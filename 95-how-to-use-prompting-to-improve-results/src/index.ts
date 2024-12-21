import { SemanticSimilarityExampleSelector } from "@langchain/core/example_selectors";
import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { createSqlQueryChain, SQL_PROMPTS_MAP } from "langchain/chains/sql_db";
import { SqlDatabase } from "langchain/sql_db";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { DataSource } from "typeorm";

export const examples = [
  { input: "List all artists.", query: "SELECT * FROM Artist;" },
  {
    input: "Find all albums for the artist 'AC/DC'.",
    query:
      "SELECT * FROM Album WHERE ArtistId = (SELECT ArtistId FROM Artist WHERE Name = 'AC/DC');",
  },
  {
    input: "List all tracks in the 'Rock' genre.",
    query:
      "SELECT * FROM Track WHERE GenreId = (SELECT GenreId FROM Genre WHERE Name = 'Rock');",
  },
  {
    input: "Find the total duration of all tracks.",
    query: "SELECT SUM(Milliseconds) FROM Track;",
  },
  {
    input: "List all customers from Canada.",
    query: "SELECT * FROM Customer WHERE Country = 'Canada';",
  },
  {
    input: "How many tracks are there in the album with ID 5?",
    query: "SELECT COUNT(*) FROM Track WHERE AlbumId = 5;",
  },
  {
    input: "Find the total number of invoices.",
    query: "SELECT COUNT(*) FROM Invoice;",
  },
  {
    input: "List all tracks that are longer than 5 minutes.",
    query: "SELECT * FROM Track WHERE Milliseconds > 300000;",
  },
  {
    input: "Who are the top 5 customers by total purchase?",
    query:
      "SELECT CustomerId, SUM(Total) AS TotalPurchase FROM Invoice GROUP BY CustomerId ORDER BY TotalPurchase DESC LIMIT 5;",
  },
  {
    input: "Which albums are from the year 2000?",
    query: "SELECT * FROM Album WHERE strftime('%Y', ReleaseDate) = '2000';",
  },
  {
    input: "How many employees are there",
    query: 'SELECT COUNT(*) FROM "Employee"',
  },
];

(async function () {
  const dataSource = new DataSource({
    type: "sqlite",
    database: "./Chinook_Sqlite.sqlite",
  });
  // https://github.com/lerocha/chinook-database/blob/master/ChinookDatabase/DataSources/Chinook_Sqlite.sqlite

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: dataSource,
  });
  console.log(db.allTables.map((t) => t.tableName));

  console.log({
    SQL_PROMPTS_MAP,
    SQL_PROMPTS_MAP_keys: Object.keys(SQL_PROMPTS_MAP),
  });

  console.log({
    sqlite: SQL_PROMPTS_MAP.sqlite,
  });

  const context = await db.getTableInfo();
  console.log(context);

  const examplePrompt = PromptTemplate.fromTemplate(
    `User input: {input}\nSQL Query: {query}`
  );

  const prompt = new FewShotPromptTemplate({
    examples: examples.slice(0, 5),
    examplePrompt,
    prefix: `You are a SQLite expert. Given an input question, create a syntactically correct SQLite query to run.
Unless otherwise specified, do not return more than {top_k} rows.

Here is the relevant table info: {table_info}

Below are a number of examples of questions and their corresponding SQL queries.`,
    suffix: "User input: {input}\nSQL query: ",
    inputVariables: ["input", "top_k", "table_info"],
  });

  console.log(
    await prompt.format({
      input: "How many artists are there?",
      top_k: "3",
      table_info: "foo",
    })
  );

  const exampleSelector = await SemanticSimilarityExampleSelector.fromExamples<
    typeof MemoryVectorStore
  >(
    examples,
    new OllamaEmbeddings({ model: "mxbai-embed-large" }),
    MemoryVectorStore,
    {
      k: 5,
      inputKeys: ["input"],
    }
  );

  console.log(
    await exampleSelector.selectExamples({
      input: "how many artists are there?",
    })
  );

  const chain = await createSqlQueryChain({
    db,
    llm: new ChatOllama({
      model: "llama3.2",
      temperature: 0,
    }),
    prompt,
    dialect: "sqlite",
  });

  console.log(await chain.invoke({ question: "how many artists are there?" }));
})();
