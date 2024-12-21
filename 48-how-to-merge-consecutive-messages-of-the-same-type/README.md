# How to filter messages

This project is based on the [How to merge consecutive messages of the same type](https://js.langchain.com/docs/how_to/merge_message_runs/).

A tutorial project demonstrating how to merge consecutive messages of the same type using LangChain. This project is based on LangChain documentation and showcases how to merge consecutive messages of the same type in a human-like chat
conversation.

#### `src/index.ts`

This file contains the main application code that demonstrates how to
merge consecutive messages of the same type using LangChain's `ChatOllama`
model. It imports necessary modules from LangChain and creates an instance
of `ChatOllama`. It then defines a list of messages, merges them, and
invokes the merged message run through the chatbot.
