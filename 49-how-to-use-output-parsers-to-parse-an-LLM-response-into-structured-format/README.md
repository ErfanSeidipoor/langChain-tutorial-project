# How to use output parsers to parse an LLM response into structured format

This project is based on the [How to use output parsers to parse an LLM response into structured format](https://js.langchain.com/docs/how_to/output_parser_structured)

This project demonstrates how to use LangChain's output parsers to parse
an LLM response into a structured format. The code is based on the
LangChain documentation and provides four example files that showcase
different usage scenarios.

## Files and Their Purpose

### 1-structured-output-parser.ts

- This file demonstrates how to create a `StructuredOutputParser` from a
  Zod schema.
- It uses the OpenAI chat model (`gpt-3.5-turbo`) to generate responses
  to user questions.
- The parser validates the output and ensures it conforms to the
  specified schema.

### 2-validation.ts

- This file showcases how to validate an input message using a
  `StructuredOutputParser`.
- It uses the OpenAI chat model (`gpt-3.5-turbo`) to generate responses
  to user questions.
- The parser validates the output and ensures it conforms to the
  specified schema.

### 3-streaming.ts

- This file demonstrates how to use streaming with
  `StructuredOutputParser`.
- It uses the OpenAI chat model (`gpt-3.5-turbo`) to generate responses
  to user questions.
- The parser validates the output and ensures it conforms to the
  specified schema.

### 4-json-output-parser.ts

- This file demonstrates how to create a `JsonOutputParser` from
  scratch.
- It uses the OpenAI chat model (`gpt-3.2`) to generate
  responses to user questions.
- The parser generates JSON output without wrapping it in markdown
  blocks.
