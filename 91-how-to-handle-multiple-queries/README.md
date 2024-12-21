# How to handle multiple queries

This project is based on the [How to handle multiple queries
](https://js.langchain.com/docs/how_to/query_multiple_queries/)

A tutorial project based on LangChain documentation, demonstrating how to handle multiple queries.

## Files and Their Content

### `src/index.ts`

This file contains the main script of the application. It imports necessary modules from LangChain and sets up a retriever using the Ollama embeddings model. The `RunnableSequence` class is used to chain together different components for processing search queries. The code also defines a custom lambda function that retrieves documents from the vector store based on the search query.
