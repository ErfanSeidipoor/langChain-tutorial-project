# How to route execution within a chain

This project is a comprehensive tutorial on routing execution within a chain using LangChain's core
modules.

## Table of Contents

1. [Introduction](#introduction)
2. [Files and Their Descriptions](#files-and-their-descriptions)

## Introduction

---

LangChain is an open-source library for building conversational AI models, providing a flexible
framework for creating custom prompt templates, executing sequences of tasks, and more.

## Files and Their Descriptions

---

### `src/1-custom-function.ts`

- This file defines a custom function using LangChain's ChatPromptTemplate, StringOutputParser,
  and RunnableSequence. It classifies questions as related to LangChain or Antropic.
- The function uses the LLaMA model to generate responses based on user input.

### `src/2-semantic-similarity.ts`

- This file demonstrates semantic similarity using OllamaEmbeddings. It embeds documents and
  queries, then calculates cosine similarity to determine the prompt template for a given question.
- The function uses the LLaMA model to generate responses based on user input.
