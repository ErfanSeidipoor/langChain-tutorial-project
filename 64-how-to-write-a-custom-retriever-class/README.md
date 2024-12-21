# How to do retrieval with contextual compression

This project is based on the [How to do retrieval with contextual compression](https://js.langchain.com/docs/how_to/contextual_compression/)

A tutorial project demonstrating how to perform retrieval with contextual
compression using LangChain.

## Project Structure

- `1-vanilla-vector-store.ts`: Demonstrates vanilla vector store retrieval using
  HNSWLib and ContextualCompressionRetriever.
- `2-embeddings-filter.ts`: Shows how to use embeddings filters for retrieval,
  including the OllamaEmbeddings model.
- `3-stringing-compressors-and-document-transformers.ts`: Explores stringing
  compressors and document transformers, utilizing OpenAIEmbeddings and
  TavilySearchAPIRetriever.
