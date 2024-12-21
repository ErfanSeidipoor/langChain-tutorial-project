# How to filter messages

This project is based on the [How to filter messages](https://js.langchain.com/docs/how_to/filter_messages/).

This is a tutorial project based on the Langchain documentation. The
project demonstrates how to use the Langchain library to filter messages
and chain responses.

### Files

---

#### `src/1-basic.ts`

This file showcases the basic usage of the Langchain library by creating a
new instance of the `ChatOllama` model and filtering out specific message
names using the `filterMessages` function. The example includes two
chained responses: one with filtered messages and another without.

#### `src/2-chaining.ts`

Similar to `src/1-basic.ts`, this file demonstrates chaining responses
using the same `filterMessages` function, but with a slight difference in
the input messages.
