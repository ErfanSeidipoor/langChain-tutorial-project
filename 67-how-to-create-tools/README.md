# How to create Tools

This project is based on the [How to create Tools](https://js.langchain.com/docs/how_to/custom_tools)

The project includes three example tools: `adder`, `multiply`, and `generateRandomInts`. Each
tool implements a different functionality, showcasing the flexibility of Langchain's tooling
API.

## Tools

### 1. Basic Tool (`src/1-basic.ts`)

This tool takes two numbers as input and returns their sum. It is an example of a simple tool
that can be used to perform basic calculations.

### 2. Dynamic Structured Tool (`src/2-dynamic-structured-tool.ts`)

This tool is similar to the `adder` tool, but it uses Langchain's dynamic structured tools API
to define its schema and functionality. It takes two numbers as input and returns their
product.

### 3. Returning Artifacts of Tool Execution

(`src/3-returning-artifacts-of-Tool-execution.ts`)

This tool generates an array of random integers and returns it as part of its response. It
demonstrates how to return artifacts from a tool's execution.
