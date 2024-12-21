# How to pass run time values to tools

This project is based on the [How to pass run time values to tools](https://js.langchain.com/docs/how_to/tool_runtime/)

LangChain is a powerful framework for building conversational AI models.
This tutorial shows how to define tools that can be invoked within a
model, and how to pass runtime values to these tools.

## Files

### `src/1-with-context-variables.ts`

This file demonstrates how to use context variables when defining a tool.
The `updateFavoritePets` function is defined as a tool with a schema that
expects an array of strings as input.

### `src/2-without-context-variables.ts`

This file shows how to define a tool without using context variables. The
`generateToolsForUser` function generates the necessary tools for a given
user ID, and the `handleTunTimeRequest` function invokes these tools
within the model.
