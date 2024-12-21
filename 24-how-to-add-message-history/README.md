# How to add message history

## Introduction

This project is based on the LangChain documentation and demonstrates how to add message history to a workflow.

## Project Structure

The project consists of two files: `src/1-basic.ts` and `src/2-object-inputs.ts`. Both files demonstrate different approaches to adding message history to a
workflow using LangChain.

### src/1-basic.ts

This file demonstrates the basic approach to adding message history. It creates a `StateGraph` with a single node that invokes the LLaMA 3.2 model, passing in the
messages as input. The workflow is then compiled and run multiple times to demonstrate its functionality.

**Differences from src/2-object-inputs.ts:**

- This file uses a simple `MessagesAnnotation` instead of a custom annotation.
- It does not use an object-based input format.
- It has a simpler workflow structure.

### src/2-object-inputs.ts

This file demonstrates the object-based approach to adding message history. It creates a custom annotation (`GraphAnnotation`) and uses it to define the workflow.
The workflow is then piped through a `ChatPromptTemplate` that formats the input messages in a specific way. The model is invoked with the formatted input, and the
response is logged to the console.

**Differences from src/1-basic.ts:**

- This file uses an object-based input format.
- It defines a custom annotation (`GraphAnnotation`) instead of using `MessagesAnnotation`.
- It has a more complex workflow structure.
