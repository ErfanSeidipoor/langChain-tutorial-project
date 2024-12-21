# LangChain Tutorial: Calling Tools with Chat Models

This project demonstrates how to utilize LangChain's chat models
(ChatOllama and ChatOpenAI) to invoke custom tools for performing specific
tasks within conversations. It serves as a practical guide based on the
LangChain documentation:
<https://js.langchain.com/docs/how_to/tool_calling/>

## Project Structure

The project consists of the following files:

- `src/1-langchain-core-tool.ts`: This file implements a custom calculator
  tool using LangChain's core tool functionality.
- `src/2-model-specific.ts`: This file demonstrates integrating the
  calculator tool with both ChatOllama and ChatOpenAI models. It highlights
  the flexibility of using the same tool across different chat models.

## File Details

### src/1-langchain-core-tool.ts

#### Overview

Defines a calculator function that performs basic mathematical operations
based on provided arguments.

#### Implementation

Implements a calculator tool using LangChain's tool function, specifying
its name, description, and input schema.

Binds the tool to the ChatOllama model, enabling tool invocation within
chat interactions.

Executes a sample interaction where the model calculates "3 \* 12" using
the bound tool.

### src/2-model-specific.ts

#### Overview

Demonstrates using the same calculator tool with both ChatOllama and
ChatOpenAI models.

For ChatOpenAI, it defines the tool directly within the model binding,
showcasing a model-specific approach.

Executes a sample interaction with ChatOpenAI to calculate "3 \* 12" using
the embedded tool.
