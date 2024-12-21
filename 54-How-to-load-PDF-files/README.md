# How to load PDF files

This project is based on the [How to load PDF files
](https://js.langchain.com/docs/how_to/document_loader_pdf)

This tutorial demonstrates how to load and process PDF documents using LangChain.

## Files and Their Content

- `src/1-with-pdf-parse.ts`: This file showcases loading a single document from a PDF file using the `PDFLoader` class. It also shows loading individual pages from the same PDF
  file. + Difference: Only one document per file, with no option to load individual pages.
- `src/2-with-pdfjs-dist.ts`: This file demonstrates loading a PDF file using the `PDFLoader` class and specifying an alternative `pdfjs` module for rendering PDF content.
  - Difference: Uses an alternative `pdfjs` module for rendering PDF content, allowing for more control over PDF rendering.
