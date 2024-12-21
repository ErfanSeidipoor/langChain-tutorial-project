import { BaseExampleSelector } from "@langchain/core/example_selectors";
import { Example } from "@langchain/core/prompts";

// class BaseExampleSelector {
//   addExample(example: Example): Promise<void | string>;
//   selectExamples(input_variables: Example): Promise<Example[]>;
// }

export class CustomExampleSelector extends BaseExampleSelector {
  private examples: Example[];

  constructor(examples: Example[]) {
    super();
    this.examples = examples;
  }

  async addExample(example: Example): Promise<void | string> {
    this.examples.push(example);
    return;
  }

  async selectExamples(inputVariables: Example): Promise<Example[]> {
    // This assumes knowledge that part of the input will be a 'text' key
    const newWord = inputVariables.input;
    const newWordLength = newWord.length;

    // Initialize variables to store the best match and its length difference
    let bestMatch: Example | null = null;
    let smallestDiff = Infinity;

    // Iterate through each example
    for (const example of this.examples) {
      // Calculate the length difference with the first word of the example
      const currentDiff = Math.abs(example.input.length - newWordLength);

      // Update the best match if the current one is closer in length
      if (currentDiff < smallestDiff) {
        smallestDiff = currentDiff;
        bestMatch = example;
      }
    }

    return bestMatch ? [bestMatch] : [];
  }
}
