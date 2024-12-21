## How to stream tool calls

This project is a demonstration of the LangChain library, specifically the
`@langchain/core` and `@langchain/ollama` modules.

## File Description

### src/index.ts

The main entry point of the project. This file defines two tools (`add`
and `multiply`) using the `tool` function from `@langchain/core`. It also
creates a model instance and binds the tools to it, allowing them to be
used in a stream.
