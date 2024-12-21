# How to dispatch custom callback events

This project is based on the [How to dispatch custom callback events](https://js.langchain.com/docs/how_to/callbacks_custom_events/)

This repository provides an example of how to dispatch custom callback events using LangChain.

## Files Overview

### src/1-basic.ts

- Creates a reflect that dispatches two events, one of which is handled by a default event listener.
- Demonstrates the basic usage of LangChain's `RunnableLambda` and `dispatchCustomEvent`.
- Differences from other files: uses default event listener instead of custom one.

### src/2-callback-handler.ts

- Creates a reflect that dispatches the same events as in the previous example.
- Uses a callback function to process the events, allowing for more control over event handling.
- Differences from other files: uses custom callback function for event processing.
