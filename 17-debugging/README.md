# Langchain Debugging

The Langchain tutorial aims to create a conversational assistant using
Langchain libraries. The project structure consists of two main files:
`1-basic.ts` and `2-verbose.ts`. These files demonstrate how to build a
basic conversational assistant with essential functionalities.
https://js.langchain.com/docs/how_to/debugging/

## Understanding the Code

The code consists of two main parts:

### 1-basic.ts

This file implements a simple assistant with essential functionalities.
Here's an overview of the code:

- Imports necessary Langchain libraries for creating the assistant and
  tools.
- Tools: An array containing instances of `TavilySearchResults` (web
  search) and `Calculator`.
- Prompt: Defines the conversation structure using `ChatPromptTemplate`.
- LLM (Large Language Model): Creates a `ChatOllama` instance with the
  "llama3.2" model and sets a temperature of 0.
- run(): Asynchronous function that:
  _ Creates a `createToolCallingAgent` with LLM, tools, and prompt.
  _ Initializes AgentExecutor with the created agent and tools.
  _ Invokes the agent with a user input ("Who directed the 2023 film
  Oppenheimer...").
  _ Logs the input and output to the console.

### 2-verbose.ts

This file builds upon the basic example, enabling verbose logging. Here's
an overview of the code:

- Similar structure to `1-basic.ts`, but enables verbose logging:
  _ Tools array: Sets verbose to true for both `TavilySearchResults`
  and `Calculator`.
  _ LLM: Sets verbose to true for the `ChatOllama` instance. \* AgentExecutor: Sets verbose to true for the executor to display
  additional information.

**Key Differences between 1-basic.ts and 2-verbose.ts**

The main difference between these two files is the level of logging.
`2-verbose.ts` provides more detailed information during execution (tool
responses, internal steps), while `1-basic.ts` logs only the input and
output to the console.
