# How to access the RunnableConfig from a tool

This project is based on the [How to access the RunnableConfig from a tool](https://js.langchain.com/docs/how_to/tool_configure/)

This project demonstrates how to access the `RunnableConfig` from a tool
using Langchain documentation.

- `src/index.ts`: This file defines a custom Langchain tool named
  "reverse_tool". The tool combines input text with a configurable
  parameter. + Differences from other files: This is the only file that
  modifies the `configurable` field in the `RunnableConfig`.
