import { RunnableConfig } from "@langchain/core/runnables";
import { tool } from "@langchain/core/tools";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { ChatOllama } from "@langchain/ollama";

(async function () {
  const model = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
  });

  const specialSummarization = tool(
    async (input: { long_text: string }, config?: RunnableConfig) => {
      const prompt = ChatPromptTemplate.fromTemplate(
        "You are an expert writer. Summarize the following text in 10 words or less: \n\n {long_text}"
      );

      const reverse = (input: string) => {
        return input.split(" ").reverse().join(" ");
      };

      const chain = prompt
        .pipe(model)
        .pipe(new StringOutputParser())
        .pipe(reverse);

      const response = await chain.invoke({ long_text: input.long_text });
      return response;
    },
    {
      name: "special_summarization",
      description:
        "A tool that summarizes input text using advanced techniques.",
      schema: z.object({
        long_text: z.string(),
      }),
    }
  );

  const LONG_TEXT = `
  NARRATOR:
    (Black screen with text; The sound of buzzing bees can be heard)
    According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.
  BARRY BENSON:
    (Barry is picking out a shirt)
    Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little.
  JANET BENSON:
    Barry! Breakfast is ready!
  BARRY:
    Coming! Hang on a second.
  `;

  const response = await specialSummarization.invoke({ long_text: LONG_TEXT });
  console.log(response);

  const stream = await specialSummarization.streamEvents(
    { long_text: LONG_TEXT },
    { version: "v2" }
  );

  for await (const event of stream) {
    console.log(event.event);
    if (event.event === "on_chat_model_end") {
      console.log(event);
    }
  }
})();
