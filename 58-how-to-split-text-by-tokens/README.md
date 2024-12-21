# How to split text by tokens

This project is based on the [How to split text by tokens
](https://js.langchain.com/docs/how_to/split_by_token)

This project demonstrates how to split a text into tokens
using the TokenTextSplitter from LangChain.

## File

### `src/index.ts`

- Description: Splits the contents of
  "state_of_the_union.txt" into chunks of 10 tokens.
- Differences from other files:
  _ Uses the TokenTextSplitter from LangChain to split
  the text.
  _ Creates a list of documents using the created
  token splits.
