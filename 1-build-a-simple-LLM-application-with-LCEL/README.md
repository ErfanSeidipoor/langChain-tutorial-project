# Large Language Model (LLM) Application using Langchain and OpenAI API

## Introduction

---

This project demonstrates different approaches to building a simple LLM application using the Langchain library and the OpenAI API. This project is based on the Langchain tutorial: https://js.langchain.com/docs/tutorials/llm_chain
Building a Simple LLM Application with LCEL.

## Dependencies

---

### Required Libraries

- `@langchain/core`: Core functionalities of Langchain for building conversational AI pipelines.
- `@langchain/openai`: Integration with OpenAI's GPT-3 models through Langchain.

## Scripts

---

The project includes three scripts for demonstrating different approaches:

### 1. basic.ts

- Demonstrates the most basic approach, manually constructing messages and sending them to the model.

### 2. lcel.ts

- Shows how to chain components (model and parser) using LCEL for a more streamlined flow.

### 3. prompt-template.ts

- Introduces ChatPromptTemplate allowing you to create reusable prompts with user input and dynamically generate chat messages.

## Running the Scripts

---

### Prerequisites

- Install Node.js and npm from https://nodejs.org/en/about/previous-releases.
- Create a file named `.env` in the project directory with your OpenAI API key: `OPENAI_API_KEY=YOUR_API_KEY`.

### Running individual scripts

- Navigate to the project directory and run the desired script using the following command:
  - Bash: `npm run <script-name>`
- Replace `<script-name>` with the desired script (e.g., `basic`, `lcel`, `prompt-template`).

## Langchain and LCEL

---

### Overview

This project uses Langchain, a library designed for building conversational AI applications. Langchain provides components like messages and parsers that can be easily chained together
using LCEL for flexible and efficient model interactions.

### Further Exploration

- Langchain documentation: https://github.com/langchain-ai/langchainjs
- OpenAI API documentation: https://openai.com/index/openai-api/

## Acknowledgments

---

This README provides a basic understanding of the project, its dependencies, scripts, and the utilized framework. Feel free to explore the code further and experiment with different
functionalities offered by Langchain and the OpenAI API
