# How to pass callbacks into a module constructor

This project is based on the [How to pass callbacks into a module constructor](https://js.langchain.com/docs/how_to/callbacks_constructor/)

This project demonstrates how to pass callbacks into a module constructor using LangChain.

## Files and Content

### `src/index.ts`

This file showcases an example of passing callbacks into a module constructor. It imports
required classes from `@langchain/core`, creates a new instance of `ConsoleCallbackHandler`
and `ChatPromptTemplate`, sets up the Ollama model, pipes prompts through the chain, and
invokes it with a callback.
