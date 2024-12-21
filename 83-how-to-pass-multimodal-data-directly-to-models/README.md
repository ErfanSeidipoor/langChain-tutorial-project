# How to pass multimodal data directly to models

This project is based on the [How to pass multimodal data directly to models](https://js.langchain.com/docs/how_to/multimodal_inputs/)

The LangChain library provides a unified interface for various AI models and tools. This project showcases how to create and deploy these models using TypeScript.

## Files Explanation

---

### src/1-local-image.ts

- Description: Demonstrates how to use the `ChatOllama` model with local image data.
- Difference from other files: Only uses a single image file, unlike the online images which require internet connections.

### src/2-online-image.ts

- Description: Shows how to utilize the `ChatOllama` model with remote online image data.
- Difference from other files: Requires an internet connection to access the remote image URL.

### src/3-two-image.ts

- Description: Explores how to pass multiple images to a single model invocation using callback events.
- Difference from other files: Involves passing two different image URLs in the message content, unlike the previous examples which only
  used a single image.
