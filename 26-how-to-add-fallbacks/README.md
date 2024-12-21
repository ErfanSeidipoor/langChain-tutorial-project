# LangChain Tutorial Project

=====================================

This project demonstrates how to create and use fallback models in
LangChain, a suite of open-source tools that enable conversational AI and
natural language understanding

## Table of Contents

---

1. [Overview](#overview)
2. [Files](#files)

## Overview

---

LangChain provides several modules for building conversational AI
applications, including the ability to create fallback models. Fallbacks
are an essential component in ensuring that our models can handle
unexpected inputs or failures. This project showcases how to create and
use fallback models with LangChain.

- **Model creation**: Creating a custom model with fallbacks.
- **Building a chain**: Building a chain of models to process input
  prompts.
- **Handling long inputs**: Handling long input prompts that exceed the
  maximum length limit.
- **Better model**: Using a better model for generating output.

## Files

---

### src/1-model.ts

**Description:** This file demonstrates how to create a custom model with
fallbacks. It uses two models: `potato!` and `llama3.2`. The
`withFallbacks` method is used to specify the fallback models.

### src/2-chain.ts

**Description:** This file showcases building a chain of models to process
input prompts. It uses two models: `gpt-3.5-turbo` and
`gpt-3.5-turbo-16k`. The `pipe` method is used to connect the models in
sequence.

### src/3-handling-long-input.ts

**Description:** This file demonstrates how to handle long input prompts
that exceed the maximum length limit. It uses two models: `gpt-3.5-turbo`
and `gpt-3.5-turbo-16k`. The `invoke` method is used to process the input
prompt.

### src/4-better-model.ts

**Description:** This file showcases using a better model for generating
output. It uses two models: `gpt-3.5-turbo-instruct` and `gpt-4`. The
`StructuredOutputParser` is used to parse the output from the models.
