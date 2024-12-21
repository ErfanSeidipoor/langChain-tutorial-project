# How to use few shot examples

This is a tutorial project demonstrating how to use few-shot examples with
LangChain. It includes two files, `1-basic.ts` and
`2-example-selector.ts`, which showcase different ways of using few-shot
prompts.

## Files

---

### src/1-basic.ts

- This file demonstrates a basic example of using a few-shot prompt
  template.
- It imports necessary modules from LangChain and creates an instance of
  `FewShotPromptTemplate`.
- The `examples` array contains sample data for the prompt, which
  includes input questions and their corresponding answers.

```markdown
- src/1-basic.ts: A basic example of using a few-shot prompt template.
  (Few-shot prompts)
```

### src/2-example-selector.ts

- This file demonstrates how to use an example selector to find similar
  examples in the `examples` array.
- It also uses a few-shot prompt template, but this time it creates an
  instance of `SemanticSimilarityExampleSelector`.
- The `run` function iterates over the selected examples and prints
  their contents.

```markdown
- src/2-example-selector.ts: An example selector demonstrating how to find
  similar examples. (Few-shot prompts)
```
