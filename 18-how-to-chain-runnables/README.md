# Langchain Chain Composition Tutorial

This project is a tutorial for building conversational assistants using Langchain libraries. It demonstrates how to chain various functionalities together to create more complex interactions. The project references the Langchain documentation at https://js.langchain.com/v0.1/docs/modules/chains/.

## Project Structure

The project consists of several TypeScript files in the src directory:

- `1-basic.ts`: This is the most basic example, demonstrating a simple prompt-to-model interaction.

- `2-composed-chain.ts`: This file builds upon the basic example by adding an analysis step to determine if the joke is funny.

- `3-composed-chain-runnable-lambda.ts`: This example introduces a RunnableLambda to encapsulate the joke retrieval and analysis logic.

- `4-composed-chain-runnable-sequence.ts`: Similar to 3, but utilizes RunnableSequence to chain the functionalities. (Order matters)

- `5-composed-chain-runnable-sequence.ts`: This demonstrates another approach to RunnableSequence where order doesn't strictly matter.
