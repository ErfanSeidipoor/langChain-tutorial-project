# LangChain Text Summarization Tutorial

This project demonstrates how to summarize YouTube video transcripts
using LangChain.

### src/index.ts

- This is the main script of the project.
- It imports all the necessary libraries and defines the logic for:
  - Loading the transcript
  - Splitting it into chunks
  - Summarizing it with an LLM
  - Refining the summary iteratively

## Breakdown of src/index.ts

### Imports

- `loadSummarizationChain` from LangChain: loads a pre-built chain for
  text summarization.
- `SearchApiLoader` from LangChain community: allows loading documents
  from a web search API (used for YouTube transcripts).
- `TokenTextSplitter` from LangChain: splits text into smaller chunks for
  processing by the LLM.
- `PromptTemplate` from LangChain core: helps define prompts for the LLM.
- `ChatOpenAI` from LangChain OpenAI: interacts with the OpenAI API for
  accessing an LLM (Large Language Model).

### Configuration

- Defines a loader to fetch the transcript of a specific YouTube video
  using its ID.
- Sets up the text splitter with chunk size and overlap for efficient
  processing.
- Configures the OpenAI connection with the desired LLM model
  (gpt-3.5-turbo) and temperature parameter.
- Creates two prompt templates: + `summaryTemplate`: defines the initial prompt for the LLM to summarize
  the transcript and generate example questions. + `summaryRefineTemplate`: defines a prompt for refining the summary and
  questions iteratively based on previous outputs.

### Loads a pre-built summarization chain from LangChain that uses the

LLM and defined prompts.

## Execution

- Runs the `run` function asynchronously:
  1.  Loads the transcript using the defined loader.
  2.  Splits the transcript into chunks.
  3.  Runs the summarization chain on the split text.
  4.  Prints the final summary and example questions to the console.

This project showcases how LangChain components can be combined to build
a text summarization application with iterative refinement.
