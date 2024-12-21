# **LangChain Streaming Tutorial**

## **Overview**

This project serves as a practical guide to LangChain's streaming
capabilities, enabling you to interact with large language models (LLMs)
in a continuous, real-time fashion.

## **Project Structure**

The project consists of the following key directories and files:

- **src/ directory**: This directory contains the core TypeScript code
  for the various tutorial examples:

  \_ `basic.ts`: Introduces a basic streaming interaction using the
  ChatOllama model.

  \_ `chain.ts`: Demonstrates constructing a LangChain that prompts an
  LLM for a joke.

  \_ `json-output.ts`: Illustrates generating JSON-formatted output
  from an LLM.

  \_ `json-output-extraction.ts`: Shows how to extract specific data from JSON output.

  \_ `non-streaming-components.ts`: Explores non-streaming components for text retrieval.

  \_ ` runnable-passthrough.ts`: Introduces RunnablePassthrough for handling dynamic data.

  \_ `stream-events.ts`: Demonstrates handling LLM stream events.

  \_ `stream-events-json-parser.ts`: Shows processing JSON-formatted stream events.

Here are some examples:

- `npm run basic`: Run the basic streaming example
- `npm run chain`: Run the chain example
- `npm run json-output`: Run the JSON output example

## **Understanding the Code**

The provided code examples illustrate various aspects of LangChain
streaming. Here's a brief breakdown of some key concepts:

- **LLM Interaction**: LangChain provides different adaptors (e.g.,
  ChatOllama, ChatOpenAI) for interacting with specific LLMs.
- **Prompting**: LangChain features `ChatPromptTemplate` to construct
  prompts for LLMs, incorporating variables or context.
- **Output Parsing**: LangChain offers various output parsers (e.g.,
  `StringOutputParser`, `JsonOutputParser`) to process LLM responses in
  different formats.
- **Stream Management**: LangChain facilitates managing streams of data
  from LLMs using the stream method and iterating through chunks of output.

## **Additional Resources**

- LangChain Documentation: [invalid URL removed]
- LangChain GitHub Repository: https://github.com/langchain-ai/langchain

## **Conclusion**

This tutorial project provides a solid foundation for understanding
LangChain's streaming capabilities. Feel free to experiment with the code
examples, explore the LangChain documentation, and dive deeper into
building your own interactive applications powered by LLMs.
