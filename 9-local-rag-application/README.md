### Local RAG Application - A Tutorial on Question Answering with LLMs

#### Project Overview

This project is a tutorial that demonstrates how to build a local Question
Answering (QA) application using LangChain and a large language model
(LLM). The application leverages the Retrieval Augmented Generation (RAG)
technique to answer user questions based on retrieved information from a
local document source.

### Project Structure

#### src/

This directory contains the core source code for the application, divided
into separate files for different functionalities:

- `1-llama.ts`: This file showcases a basic LLM interaction using
  ChatOllama to generate a rap battle between Stephen and John Oliver.
- `embedding.ts`: This file demonstrates document loading, text splitting,
  generating embeddings, and performing similarity search using the
  retrieved documents.
- `chain.ts`: This file builds a basic chain that retrieves relevant
  documents based on the user's question and uses the LLM to summarize the
  retrieved content.
- `qa.ts`: This file attempts to use a pre-defined RAG prompt from the
  LangChain Hub, but ultimately builds a custom RAG prompt template.
- `qa-with-retrieval.ts`: This file implements a complete QA pipeline with
  retrieval, prompt generation, and LLM interaction for answering the user's
  question.

#### package.json

This file defines project metadata, dependencies, and scripts for running
different parts of the application.

### Dependencies

The project relies on the following libraries:

- `@langchain/core`
- `@langchain/ollama`
- `@langchain/community` (offers additional components like Cheerio web
  document loader)
- `cheerio`
- `ts-node`

#### Running the Application

The package.json file defines various scripts for running different parts
of the application. You can execute these scripts using node -r
ts-node/register --env-file=.env src/<script_name>.ts.

For example:

```bash
node -r ts-node/register --env-file=.env src/1-llama.ts
```

#### Runs the LLM interaction for the rap battle generation.

And:

```bash
node -r ts-node/register --env-file=.env src/5-qa-with-retrieval.ts
```

#### Runs the complete QA pipeline for answering user questions.

### Learning More

This project serves as a starting point for understanding RAG-based QA
systems with LangChain. You can refer to the LangChain documentation
(https://js.langchain.com/docs/introduction/) for further exploration of
functionalities and building more complex applications.
