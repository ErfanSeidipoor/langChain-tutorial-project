# Query Analysis System - README

## Live Tutorial

[Visit our live tutorial for more
information](https://js.langchain.com/docs/tutorials/query_analysis/).

## Project Overview

This system leverages Langchain libraries to achieve the following
functionalities:

### Load Documents

Fetches transcripts from a set of YouTube video URLs and assigns
publication dates.
[src/1-load-documents.ts](#load-documents)

### Index Documents

Splits video transcripts into smaller chunks and creates a vector
representation using OpenAI embeddings. The indexed data is stored using
Chroma, a vector store.
[src/2-index-documents.ts](#index-documents)

### Retrieve Documents

Takes a search query (optionally with a publication year filter) and
retrieves relevant videos based on their transcript similarity.
[src/3-retrieve-documents.ts](#retrieve-documents)

### Query Schema

Uses a Large Language Model (LLM) to convert user questions into database
queries suitable for retrieving relevant videos.
[src/4-query-schema.ts](#query-schema)

## Running the Project

This project is written in TypeScript and requires node and pnpm.

### Load Documents

```bash
npm run load-documents
```

**Note:** This script fetches transcripts and might take some time to
complete depending on your internet speed.

### Index Documents

```bash
npm run index-documents
```

### Retrieve Documents

```bash
npm run retrieve-documents
```

This script demonstrates retrieval with and without a publication year
filter.

### Query Schema

```bash
npm run query-schema
```

This script demonstrates query analysis using an LLM and retrieval of relevant videos.

## Dependencies

- `@langchain/community`
- `@langchain/core`
- `@langchain/openai`
- [Chroma]
- [Date FNS]
- [YouTube Transcript]
- [Youtubei.js]
- [Zod]

## License

This project is licensed under the ISC License.
