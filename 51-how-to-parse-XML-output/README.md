# How to parse XML output

This project is based on the [How to parse XML output](https://js.langchain.com/docs/how_to/output_parser_xml)

This is a tutorial project based on the Langchain documentation, demonstrating how to use the library to parse XML output.

#### src/1-basic.ts

This script demonstrates how to use the `ChatOpenAI` model from Langchain to generate a shortened filmograph for Tom
Hanks. The script uses the `invoke` method to send a query to the model, which returns an object containing the result.

**Difference:** This file is focused on demonstrating the basic usage of Langchain, whereas the other files explore
more advanced topics.

#### src/2-parser.ts

This script demonstrates how to use the `XMLOutputParser` from Langchain to parse XML output. The script uses the
`invoke` method to send a query to the model, which returns an object containing the result. It then uses the `parse`
method to parse the XML output.
