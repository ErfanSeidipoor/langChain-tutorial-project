# How to parse JSON output

This project is based on the [How to parse JSON output](https://js.langchain.com/docs/how_to/output_parser_json)

This project demonstrates the usage of LangChain's JSON output parsing feature. It showcases two example scripts,
`parser.ts` and `streaming.ts`, which use different models to parse JSON output.

## Files and Structure

#### `src/1-parser.ts`

- Description: This script uses the `ChatOllama` model from @langchain/ollama to parse a JSON object containing setup
  and punchline fields.
- Differences: Uses `ChatOllama` model, parses a simple joke query.
- Dependencies: `@langchain/core/output_parsers`, `@langchain/core/prompts`

#### `src/2-streaming.ts`

- Description: This script uses the `ChatOpenAI` model from @langchain/openai to parse a JSON object containing setup
  and punchline fields in a streaming manner.
- Differences: Uses `ChatOpenAI` model, streams responses in real-time, parses a long joke query.
- Dependencies: `@langchain/core/output_parsers`, `@langchain/core/prompts`
