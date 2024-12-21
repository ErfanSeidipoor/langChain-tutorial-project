# LangChain Tutorial: Parallel Runnable Execution

## Introduction

This tutorial guides you through invoking LangChain runnables in parallel,
enabling you to generate multiple creative outputs seamlessly. It
leverages the `RunnableMap` class from the LangChain core library
(@langchain/core). https://js.langchain.com/docs/how_to/parallel/

## Prerequisites

- A LangChain account with access to a supported large language model
  (LLM).

### src/index.ts

Imports necessary modules from LangChain libraries.

Creates a `ChatOllama` instance specifying the LLM model.

Defines `PromptTemplates` for generating jokes and poems with the topic
variable.

Pipes each template to the `ChatOllama` model for text generation.

Constructs a `RunnableMap` to hold these chains for parallel execution.

Runs the chain map with the topic set to `"cats"`, fetching output from
both chains simultaneously.

Prints the generated joke and poem to the console.

## Key Concepts

- LangChain Runnables: Independent units of logic that produce outputs.
- RunnableMap: Manages execution of multiple runnables in parallel or
  sequence.
- PromptTemplate: Defines a template with variables for LLM prompts.
- ChatOllama: Integrates with a specific LLM for generation tasks.

## Further Exploration

Explore LangChain documentation for detailed information on modules,
configuration, and best practices: https://langchain.com/docs

Experiment with different LLM models and `PromptTemplates` for diverse
creative outputs.

Discover more complex parallel execution scenarios using the LangChain
core library.
