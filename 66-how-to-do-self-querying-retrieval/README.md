# How to retrieve the whole document for a chunk

This project is based on the [How to retrieve the whole document for a chunk](https://js.langchain.com/docs/how_to/parent_document_retriever/)

This repository contains a series of examples demonstrating how to use LangChain for parent document retrieval.

## Files and Description

### `src/1-parent-document-retriever.ts`

Retrieves parent documents using the `ParentDocumentRetriever` class from LangChain. This example uses an Ollama
embeddings vector store and sets the chunk size and overlap to 500 and 0, respectively.

### `src/2-score-threshold.ts`

Similar to the previous example, but uses a `ScoreThresholdRetriever` class with a minimum similarity score of 0.01.

### `src/3-with-contextual-chunk-headers.ts`

Uses an HNSWLib vector store and adds contextual chunk headers to the retrieved documents.
