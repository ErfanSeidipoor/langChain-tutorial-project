# Langchain Tutorial: Canceling Execution

=====================================

This project demonstrates how to cancel the execution of a Langchain
pipeline using an `AbortController`.

## Project Structure

The project consists of two files:

- **1-runnable-sequence.ts**: Demonstrates how to use `RunnableSequence`
  to chain multiple runnables together and cancel their execution after a
  certain time.
- **2-streaming.ts**: Shows how to use streaming to process the output
  of a Langchain pipeline without loading the entire result into memory.

## Files Description

### 1-runnable-sequence.ts

This file demonstrates how to create a `RunnableSequence` with multiple
runnables, including a Tavily Search API retriever and a ChatOllama. The
sequence is then executed with a timeout using an `AbortController`.

### 2-streaming.ts

Similar to the previous example, but this time we use streaming to process
the output of the pipeline without loading it into memory.
