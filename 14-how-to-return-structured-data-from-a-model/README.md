# How to return structured data from a model

This project demonstrates different ways to return structured data from a large language model (LLM) using the LangChain library. The specific LLM used here is OpenAI's gpt-3.5-turbo model.
https://js.langchain.com/docs/how_to/structured_output

## **1. Using Zod**

`using-zod.ts`

- Description: This script uses the ZOD library to validate the input format for a joke, returning only structured data (setup and punchline) while ignoring the rating.
- Differences:
  - Uses ZOD validation
  - Does not include raw JSON output

## **2. OpenAI Style**

`openai-style.ts`

- Description: Similar to `src/1-using-zod.ts`, but this script uses a custom schema provided by OpenAI's Chat model instead of defining its own structure with ZOD.
- Differences:
  - Uses OpenAI-provided schema
  - Does not use ZOD validation

## **3. Raw Output**

`raw.ts`

- Description: This script includes raw JSON output from the AI model, allowing for easy access to all generated data (setup, punchline, and rating).
- Differences:
  - Includes raw JSON output
  - Omits structured data in response

## **4. Custom Parser**

`json-output-parser.ts`

- Description: Uses a custom parser to handle OpenAI's responses in a valid JSON format. This allows for processing the output data as required.
- Differences:
  - Uses custom parser for parsing and processing AI model output
  - Handles different structure than ZOD or OpenAI schema

## **5. Custom Parsing**

`custom-parsing.ts`

- Description: Defines a custom function to parse the generated JSON from the OpenAI model and return structured data according to a specific format.
- Differences:
  - Custom parser that extracts necessary data in response
  - Organizes it into an array of people, ignoring other parts
