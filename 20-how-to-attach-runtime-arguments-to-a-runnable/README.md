# LangChain Tutorial: How to attach runtime arguments to a Runnable

Sometimes we want to invoke a Runnable within a RunnableSequence with constant arguments that are not part of the output of the preceding Runnable in the sequence, and which are not part of the user input. We can use the Runnable.bind() method to set these arguments ahead of time.
https://js.langchain.com/docs/how_to/binding/

## Introduction

This tutorial explores two key concepts in LangChain:

### Runtime Arguments

Injecting user-defined data into a runnable for dynamic execution.

### LLM Tools

Pre-defined functions that extend the LLM's capabilities with custom
logic.

## Understanding the Code

### `src/1-stop.ts`

Defines a prompt template with system and user messages.

Creates two runnables:
The first retrieves the entire output without stopping.
The second binds the LLM using `model.bind` to stop at the "SOLUTION"
keyword.
Both runnables use `StringOutputParser` for output handling.

### `src/2-tool.ts`

Defines a Zod schema to validate user input for the weather tool.

Creates a tool named getCurrentWeather using the tool function.

Binds the tool to the LLM model using `model.bindTools`.

Runs the LLM with user input requesting weather across multiple locations.

## Key Concepts

- ChatPromptTemplate: Structures prompts with system and user messages.
- ChatOllama: Integrates with the chosen LLM.
- StringOutputParser: Processes raw model output as a string.
- `model.bind()`: Restricts LLM output based on provided criteria.
- Tool(): Creates custom tools extending the LLM's functionality.
- Zod Schema: Defines validation rules for user input in tools.

## Further Exploration

Refer to LangChain documentation for extended details on these features:
https://python.langchain.com/docs/introduction/

Experiment with more complex runtime arguments and tools.

Explore available community-created tools or develop your own!
