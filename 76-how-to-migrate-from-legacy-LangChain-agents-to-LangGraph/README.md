# How to migrate from legacy LangChain agents to LangGraph

This project is based on the [How to migrate from legacy LangChain agents to LangGraph](https://js.langchain.com/docs/how_to/migrate_agent/)

This code is a migration example from legacy LangChain agents to LangGraph, which is a newer version of the LangChain framework.

**What does it do?**

The code creates an instance of `ChatOllama`, which is a type of large language model (LLM) in LangChain. It then defines a tool called `magicTool` that applies a simple magic function to its input.

Next, it sets up a prompt template with several placeholders for the user's input and chat history. The agent is created using this prompt and the `ChatOllama` instance as its LLM.

The code then defines a runnable that wraps the agent executor around a `ChatMessageHistory`, which allows the agent to keep track of its conversation history. This is important for migrating from legacy LangChain agents, which did not have this feature.

Finally, it tests the agent's output by sending it several input messages and logging the results.

**What's different about this code?**

Compared to legacy LangChain agents, this code uses LangGraph instead of
the older framework. The main differences are:

1. **LangGraph vs LangChain**: LangGraph is a newer version of LangChain that provides improved performance and features.
2. **ChatOllama vs Legacy LLMs**: LangGraph's `ChatOllama` instance is a more modern implementation of its LLM, which supports better handling of multi-turn conversations.
3. **Prompt template**: The prompt template has been updated to use the new syntax supported by LangGraph.
4. **Agent executor**: The code uses a runnable that wraps the agent executor around a `ChatMessageHistory` instance, which is not present in legacy LangChain agents.
