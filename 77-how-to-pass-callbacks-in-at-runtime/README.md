# How to pass callbacks in at runtime

This project is based on the [How to pass callbacks in at runtime](https://js.langchain.com/docs/how_to/callbacks_runtime/)

This project demonstrates how to pass callbacks to the `invoke` method of the `ChatOllama`
model.

## Files and Their Content

### src/index.ts

This file contains the main entry point of the project. It sets up a `ConsoleCallbackHandler`, creates a `ChatPromptTemplate`, and defines a `ChatOllama` model with the specified configuration. The `invoke` method is called on the model, passing in a template with a placeholder for a number, and logs the response to the console.
