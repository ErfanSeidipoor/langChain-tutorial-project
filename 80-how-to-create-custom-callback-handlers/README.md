# How to create custom callback handlers

This project is based on the [How to create custom callback handlers](https://js.langchain.com/docs/how_to/custom_callbacks/)

This tutorial project is based on the LangChain documentation and demonstrates how to create custom callback handlers.

# Files

## src/index.ts

This file contains the main code of the tutorial project. It sets up a ChatOllama model, defines a custom handler for chat model start events, and creates a stream that handles prompts from the Ollama model. The `customHandler` function is called whenever a new token is received from the model or when the model starts.
