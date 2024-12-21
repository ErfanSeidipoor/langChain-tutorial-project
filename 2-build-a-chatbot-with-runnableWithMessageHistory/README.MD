# Build-A-Chatbot-With-RunnableWithMessageHistory

A simple chatbot built using LangChain and OpenAI.
https://js.langchain.com/v0.2/docs/tutorials/chatbot

## Introduction

This project demonstrates how to build a basic chatbot using LangChain and OpenAI. The chatbot uses a sequence of
runnables to process user input and generate responses.

## Getting Started

To get started, you'll need to install the dependencies listed in `package.json`. Run the following command:

```bash
pnpm install
```

This will install the LangChain and OpenAI libraries, as well as the required dependencies for the chatbot.

## Running the Chatbot

To run the chatbot, navigate to the project directory and run one of the following scripts:

```bash
pnpm run basic
```

```bash
pnpm run stream
```

```bash
pnpm run in-memory
```

```bash
pnpm run filter-chat-history
```

Each script will run a different version of the chatbot.

## Features

- **Basic Chatbot**: Runs a simple sequence of runnable to process user input and generate responses.
- **In-Memory Chatbot**: Stores chat history in memory for each session.
- **Filter Chat History**: Truncates chat history to a specified length.
- **Stream Chatbot**: Streams chat responses instead of buffering them.

## Configuration

The chatbot can be configured by modifying the `config.json` file. This file contains settings for the OpenAI API,
such as API key and model ID.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a
pull request.

## Keywords

langchain, openai, chatbot, runnable, message history
