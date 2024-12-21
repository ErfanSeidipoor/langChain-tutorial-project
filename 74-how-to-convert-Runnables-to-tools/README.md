# https://js.langchain.com/docs/how_to/convert_runnable_to_tool/

This project is based on the [https://js.langchain.com/docs/how_to/convert_runnable_to_tool/](https://js.langchain.com/docs/how_to/convert_runnable_to_tool/)

This project demonstrates how to convert LangChain runnables into tools using various examples.

## Files and their content

### src/1-example.ts

This file shows how to create a simple tool that takes two numbers as
input and returns their product.
It uses the `RunnableLambda` from `@langchain/core/runnables` module.

### src/2-example.ts

This file demonstrates how to create a tool that appends letters to a
string.
It uses the `RunnableLambda` and `pipe` function from
`@langchain/core/runnables`.

### src/3-example.ts

This file shows how to create a tool that retrieves information about pets
using a vector store.
It uses the `MemoryVectorStore`, `OpenAIEmbeddings`, and
`createReactAgent` from LangChain modules.

### src/4-example.ts

This file demonstrates how to create a tool that answers questions using a
sequence of runnables and prompts.
It uses the `RunnableSequence`, `ChatPromptTemplate`, and
`StringOutputParser` from LangChain modules.
