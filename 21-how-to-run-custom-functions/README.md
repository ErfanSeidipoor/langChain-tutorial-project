# Langchain Tutorial Project

This project demonstrates how to use Langchain, a powerful natural language processing library, to run custom functions
and interact with OpenAI models.

https://js.langchain.com/docs/how_to/functions

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Projects](#projects)
  - [Runnable Lambda](#runnable-lambda)
  - [Runnable Sequence](#runnable-sequence)
  - [Runnable Config](#runnable-config)
  - [Streaming](#streaming)
- [Dependencies](#dependencies)
- [Installation](#installation)

## Introduction

Langchain is a powerful natural language processing library that allows you to run custom functions and interact with
OpenAI models. This tutorial project demonstrates how to use Langchain to achieve various tasks, including running
custom lambda functions, sequences, and streaming data.

## Projects

### Runnable Lambda

This project demonstrates how to run a custom lambda function using Langchain.

- **echo**: A simple echo function that takes a text and an optional configuration object.
- **config**: The configuration object for the echo function.

To run this project, use the following command: `npm run runnable-lambda`

### Runnable Sequence

This project demonstrates how to run a custom sequence of functions using Langchain.

- **prompt**: A prompt template that takes an animal as input.
- **model**: An OpenAI model that generates text based on the input animal.
- **strChain**: The chain of functions that runs in sequence.

To run this project, use the following command: `npm run runnable-sequence`

### Runnable Config

This project demonstrates how to run a custom configuration object using Langchain.

- **config**: A configuration object that takes an optional callbacks array.

To run this project, use the following command: `npm run runnable-config`

### Streaming

This project demonstrates how to stream data using Langchain.

- **prompt**: A prompt template that takes an animal as input.
- **model**: An OpenAI model that generates text based on the input animal.
- **listChain**: The chain of functions that splits the output into a list.

To run this project, use the following command: `npm run streaming`
