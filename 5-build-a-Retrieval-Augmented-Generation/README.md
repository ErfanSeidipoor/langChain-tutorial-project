# Retrieval-Augmented Generation (RAG) Project

## What is RAG?

RAG is a technique that combines retrieved documents with a large language model (LLM) to generate a response to a question.

### How it Works

- Retrieves relevant documents based on a question.
- Uses an LLM with a prompt to generate an answer.

This project demonstrates building a RAG system using the LangChain library.

## Project Overview

---

This project includes several scripts demonstrating different functionalities of LangChain:

### Script 1: Basic (1-basic.ts)

Shows the basic building blocks of a RAG system. It:

- Retrieves documents from a URL.
- Splits them into smaller chunks.
- Creates a vector representation of the documents.
- Retrieves relevant documents based on a question.
- Uses an LLM with a prompt to generate an answer.

### Script 2: Loading (2-load.ts)

Demonstrates how to configure the document loader to select specific parts of the webpage using a CSS selector.

### Script 3: Splitting Markdown (split-markdown.ts)

Showcases text splitting for markdown content.

### Script 4: Splitting HTML (split-html.ts)

Demonstrates text splitting for HTML content.

### Script 5: Retrieval with Pre-defined Content (retrieve.ts)

Similar to `split-markdown.ts`, but uses pre-defined HTML content.

### Script 6: Runnable Sequence (runnable-sequence.ts)

Builds a more modular and reusable RAG system using LangChain's RunnableSequence class. It:

- Allows for streaming the response generation process.
- Can be reused in different contexts.

### Script 7: Custom Prompts (prompt.ts)

Demonstrates how to create custom prompts for the LLM.

## Running the Scripts

Each script has a corresponding entry in the package.json scripts section. You can run a script using the following command:

```bash
npm run <script-name>
```

Replace `<script-name>` with the actual name of the script you want to run (e.g., `npm run basic`).

### Note

Some scripts require environment variables defined in a `.env` file.

## Dependencies

---

This project relies on several libraries including LangChain and its sub-packages. You can find the full list of dependencies and their versions in
the package.json file.

## Additional Notes

---

- This is a basic example and can be extended further with more complex retrieval strategies, prompt engineering, and handling different content
  formats.
- For a production-ready application, consider proper error handling, logging, and configuration management.

The provided scripts demonstrate functionalities for educational purposes.

![rag indexing](rag_indexing.png)
![rag retrieval generation](rag_retrieval_generation.png)
