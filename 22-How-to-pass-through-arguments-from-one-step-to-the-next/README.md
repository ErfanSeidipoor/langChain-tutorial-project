# How to pass through arguments from one step to the next

This project demonstrates how to pass through arguments from one step to the next in a Langchain pipeline.

## File

- `src/index.ts`: This is the main file where we set up our Langchain pipeline and demonstrate passing through arguments
  from one step to the next. + Differences with other files: This file uses `RunnableParallel` instead of `RunnableSequence`, which allows us to run
  multiple steps in parallel. It also uses `ChatOllama` as our model, which is a popular choice for conversational AI
  tasks.
