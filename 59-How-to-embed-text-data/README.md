# How to embed text data

This project is based on the [How to embed text data
](https://js.langchain.com/docs/how_to/embed_text/)

This project demonstrates how to use the Langchain library
to embed text data using OpenAI and Ollama embeddings.

## Files

### src/1-openai.ts

```markdown
- Description: This file showcases how to use OpenAI
  embeddings to embed a query.
- Difference from other files: Uses OpenAI embeddings,
  which requires an environment variable `.env` for
  authentication.
- Dependencies: @langchain/openai, ts-node
```

### src/2-ollama.ts

```markdown
- Description: This file demonstrates how to use Ollama
  embeddings to embed a query.
- Difference from other files: Uses Ollama embeddings,
  which does not require authentication and is optimized for
  sequential text processing.
- Dependencies: @langchain/ollama, ts-node
```
