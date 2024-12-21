# **Building Chatbots with LangChain**

This project demonstrates building chatbots using LangChain, a JavaScript
library for conversational AI development. It showcases various
functionalities for creating progressively sophisticated chatbots.

https://js.langchain.com/docs/tutorials/chatbot/

## **Installation**

### Prerequisites

Ensure you have Node.js and pnpm installed on your system.

## **Running the Examples**

The project provides scripts to run different chatbot examples. Each
script corresponds to a specific file in the src directory:

- `src/1.basic.ts`: Runs a basic chatbot interaction without LangChain.\

This file demonstrates a basic chatbot interaction without LangChain. It directly calls the OpenAI API with a sequence of messages. This approach lacks conversation context and memory.

- `src/2.with-langgraph.ts`: Demonstrates using LangChain's state graph
  for conversation management.

  This file showcases using LangChain's state graph. It defines a workflow with nodes representing the model call and edges connecting them. This allows maintaining the conversation state across interactions.

- `src/3.prompt-template.ts`: Illustrates building chatbots with prompt
  templates for improved control.
- `src/4.prompt-template.ts`: Similar to `src/3.prompt-template.ts`, but
  allows specifying the language.

  These files demonstrate using prompt templates for building more sophisticated chatbots. These templates define the context and instructions passed to the LLM, allowing for greater control over the conversation flow. The difference between these files is that src/4.prompt-template.ts additionally allows specifying the

- `src/5.managing-history.ts`: Shows managing conversation history with
  LangChain.

  This file showcases managing conversation history with LangChain. It implements a custom logic to trim the conversation history before making predictions, enhancing efficiency with longer interactions.

To run a script, use the following command, replacing `<script-name>` with
the actual script file name:

```bash
pnpm run <script-name>
```

## **Example**

Run the script for the 2.with-langgraph.ts file to showcase LangChain's
state graph capabilities:

```bash
pnpm run 1.basic
pnpm run 2.with-langgraph
pnpm run 3.prompt-template
pnpm run 4.prompt-template
pnpm run 5.managing-history
```

## **Explanation of the Code**

Each script in the src directory defines a chatbot interaction using
LangChain libraries. Here's a breakdown of the key libraries used:

- `@langchain/core`: Core library for building conversational flows.
- `@langchain/langgraph`: Library for managing conversation state and
  flow with state graphs.
- `@langchain/openai`: Library for interacting with the OpenAI API
  (requires an API key).
