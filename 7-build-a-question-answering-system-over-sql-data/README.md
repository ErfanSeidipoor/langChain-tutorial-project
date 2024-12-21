# 7-build-a-question-answering-system-over-sql-data

This project is a training project that demonstrates the integration of natural language processing (NLP) and database querying using LangChain, a popular framework for building conversational AI models.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Files](#files)

## Project Structure

The project consists of three main files:

- `src/1-basic.ts`: Demonstrates the basic usage of LangChain, including creating a SQL query chain and executing a query.
- `src/2-execute-query.ts`: Shows how to execute a query using the QuerySqlTool class and pipe the result through a string output parser.
- `src/3-answer-question.ts`: Explores how to answer questions by generating SQL queries, executing them, and then answering the user's question.

## Files

### src/1-basic.ts

This file demonstrates the basic usage of LangChain. It creates a ChatOpenAI instance with a specific model, sets up a data source for a SQLite database, and defines a function that creates a SQL query
chain and executes it.

```markdown
- Create a `DataSource` instance for the SQLite database.
- Create a `ChatOpenAI` instance with the specified model.
- Define a `run` function that creates a SQL query chain using `createSqlQueryChain`, executes it, and logs the result to the console.
```

### src/2-execute-query.ts

This file showcases how to execute a query using the QuerySqlTool class. It sets up a data source for the SQLite database, creates an instance of the QuerySqlTool class, defines a `run` function that
executes the query and pipes the result through a string output parser.

```markdown
- Create a `DataSource` instance for the SQLite database.
- Create a `ChatOpenAI` instance with the specified model.
- Define a `run` function that creates an instance of the QuerySqlTool class, sets up a SQL query chain using `createSqlQueryChain`, and executes it.
```

### src/3-answer-question.ts

This file explores how to answer questions by generating SQL queries, executing them, and then answering the user's question. It sets up a data source for the SQLite database, creates instances of
ChatOpenAI and QuerySqlTool classes, defines a `run` function that generates an answer prompt, executes the query, answers the question using LangChain's StringOutputParser class.

```markdown
- Create a `DataSource` instance for the SQLite database.
- Create a `ChatOpenAI` instance with the specified model.
- Define a `run` function that creates instances of QuerySqlTool and ChatOpenAI classes, generates an answer prompt, sets up a SQL query chain using `createSqlQueryChain`, executes it, answers the question
  using LangChain's StringOutputParser class.
```
