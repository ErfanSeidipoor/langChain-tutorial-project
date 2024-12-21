# How to use chat models to call tools

This project demonstrates how to use the LangChain library to build a
conversational AI model.

## Files and Their Content

### src/1-general.ts

Description: This file shows how to create a ChatOllama instance with a
specific model and define a calculation tool.
Difference from other files: Uses the `tool` function to create a
calculator tool, which is different from the OpenAI example.
Example use case: Creating a conversational AI model that can perform
mathematical operations.

### src/2-openai.ts

Description: This file shows how to create a ChatOpenAI instance with a
specific model and define a calculator tool using the `bind` method.
Difference from other files: Uses the `bind` method to pass options to the
OpenAI model, which is different from the Ollama example.
Example use case: Creating a conversational AI model that can perform
mathematical operations using the OpenAI model.
