# How to use multimodal prompts

This project is based on the [How to use multimodal prompts](https://js.langchain.com/docs/how_to/multimodal_prompts/)

This project demonstrates how to use multimodal prompts with the LangChain library. It provides two examples of using images in chat prompts: one for describing an image and another for comparing two images.

## Files

### src/1-local-image.ts

This file shows how to describe a local image using a chat prompt. It imports necessary modules, loads the image as a base64 encoded string, creates a ChatOllama model, constructs a chat prompt, and invokes the model with the image data.

```markdown
- Uses LangChain's ChatPromptTemplate to create a prompt.
- Loads an image locally and converts it to base64 format.
- Creates a ChatOllama model and uses it to generate text based on the image.
```

### src/2-online-image.ts

This file demonstrates how to compare two online images using multimodal prompts. It imports necessary modules, loads two different images as base64 encoded strings, creates a ChatOllama model, constructs a chat prompt comparing the images, and invokes the model with both images.

```markdown
- Similar to `src/1-local-image.ts`, but uses online images.
- Uses LangChain's ChatPromptTemplate to create a compare prompt.
- Invokes the ChatOllama model with two different image inputs.
```
