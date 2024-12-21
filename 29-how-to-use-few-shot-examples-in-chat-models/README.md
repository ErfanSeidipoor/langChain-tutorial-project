# Few-Shot Chat Models Tutorial

This repository provides a step-by-step guide to building and using
few-shot chat models with Langchain.

## Files

### `src/1-fixed-examples.ts`

Description:
This file demonstrates a simple example of a few-shot chat model where the
input and output are hardcoded. The model uses the Llama 3.2 model.

### `src/2-dynamic-examples.ts`

Description:
This file shows how to use dynamic examples with Langchain. It creates a
vector store from user input and selects examples based on semantic
similarity.

## Differences between files:

- `src/1-fixed-examples.ts` uses hardcoded input and output, while
- In `src/2-dynamic-examples.ts`, we also use a vector store to select
  examples based on semantic similarity.
