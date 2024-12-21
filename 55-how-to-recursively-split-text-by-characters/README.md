# How to recursively split text by characters

This project is based on the [How to recursively split text by characters](https://js.langchain.com/docs/how_to/recursive_text_splitter)

This project provides a tutorial on how to recursively split text by characters.

## Files

### src/1-basic.ts

- Description: This file demonstrates the basic usage of the RecursiveCharacterTextSplitter.
- Differences from other files:
  - Uses smaller chunk size (10) compared to `src/2-separators.ts` (50).
  - Has fewer separators in the input text.
- Contains a test case that creates documents from the input text using the `RecursiveCharacterTextSplitter`.

### src/2-separators.ts

- Description: This file showcases different separator usage with the RecursiveCharacterTextSplitter.
- Differences from other files:
  - Uses larger chunk size (50) compared to `src/1-basic.ts` (10).
  - Has more separators in the input text (`|`, `##`, and `>`).
