# How to trim messages

This project is based on the [How to trim messages](https://js.langchain.com/docs/how_to/trim_messages/).

### Overview

This repository contains example code for trimming messages using
LangChain's `trimMessages` function. The examples demonstrate how to use
LangChain's models, including InMemoryChatMessageHistory and ChatOllama.

Here are brief descriptions of what each file contains:

#### 1. basic.ts

This file demonstrates a simple example of using the `trimMessages`
function from LangChain to trim messages. It imports the necessary
modules, creates an array of message objects, and uses the `trimMessages`
function to trim the messages.

#### 2. custom.ts

This file is similar to `basic.ts`, but it shows an example of creating a
custom trimming strategy using the `strategy` option in the `trimMessages`
function.

#### 3. chaining.ts

In this file, we create a chain of transformations by piping the output of
one transformation into another. We use the `pipe` method from LangChain
to connect the `trimMessages` function with a ChatOllama model,
demonstrating how to chain together different models and functions.

#### 4. chat-message-history.ts

This file shows an example of using the `InMemoryChatMessageHistory` class
from LangChain to store and retrieve message history. We create a dummy
implementation for retrieving session history, which is then used in
conjunction with the `trimMessages` function to demonstrate how to use
message history in trimming.
