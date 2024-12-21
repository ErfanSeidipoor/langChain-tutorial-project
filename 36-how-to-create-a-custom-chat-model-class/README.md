# README

This is a tutorial project based on the LangChain documentation. It
showcases how to create a custom chat model class using the
`@langchain/core` library.

### `src/index.ts`

- This file defines the `CustomChatModel` class, which extends the
  `SimpleChatModel` from `@langchain/core/language_models/chat_models`.
- It provides two methods: `_call` for generating text based on input
  messages and `_streamResponseChunks` for streaming responses.
- The example demonstrates how to use these methods to generate text
  based on user input.
