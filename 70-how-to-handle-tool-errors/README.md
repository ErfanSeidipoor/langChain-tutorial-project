# How to handle tool errors

This project is based on the [How to handle tool errors](https://js.langchain.com/docs/how_to/tools_error/)

Langchain is a powerful AI toolkit that allows you to build custom models
and workflows. This project showcases three different ways to handle tool
errors: with an error, try-except block, and fallback.

## Files

### src/1-with-error.ts

This file demonstrates how to call a tool function with an error. It uses
the `tool` function from Langchain's core library to create a complex tool
that takes two arguments and returns their product.

### src/2-try-except-tool-call.ts

This file shows how to use try-except blocks to handle tool errors. It
creates a chain of tools, including a complex tool, and catches any errors
that occur during execution.

### src/3-fallback.ts

This file demonstrates how to use fallbacks to handle tool errors. It
creates two chains of tools: one using a bad model and another using a
better model. The `withFallbacks` method is used to specify the better
chain as a fallback in case an error occurs.
