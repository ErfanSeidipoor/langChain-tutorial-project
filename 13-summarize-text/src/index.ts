import { loadSummarizationChain } from "langchain/chains";
import { SearchApiLoader } from "@langchain/community/document_loaders/web/searchApi";

import { TokenTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const loader = new SearchApiLoader({
  engine: "youtube_transcripts",
  video_id: "WTOm65IZneg",
});

const splitter = new TokenTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0.3,
});

const summaryTemplate = `
You are an expert in summarizing YouTube videos.
Your goal is to create a summary of a podcast.
Below you find the transcript of a podcast:
--------
{text}
--------

The transcript of the podcast will also be used as the basis for a question and answer bot.
Provide some examples questions and answers that could be asked about the podcast. Make these questions very specific.

Total output will be a summary of the video and a list of example questions the user could ask of the video.

SUMMARY AND QUESTIONS:
`;

const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate);

const summaryRefineTemplate = `
You are an expert in summarizing YouTube videos.
Your goal is to create a summary of a podcast.
We have provided an existing summary up to a certain point: {existing_answer}

Below you find the transcript of a podcast:
--------
{text}
--------

Given the new context, refine the summary and example questions.
The transcript of the podcast will also be used as the basis for a question and answer bot.
Provide some examples questions and answers that could be asked about the podcast. Make
these questions very specific.
If the context isn't useful, return the original summary and questions.
Total output will be a summary of the video and a list of example questions the user could ask of the video.

SUMMARY AND QUESTIONS:
`;

const SUMMARY_REFINE_PROMPT = PromptTemplate.fromTemplate(
  summaryRefineTemplate
);

const summarizeChain = loadSummarizationChain(llm, {
  type: "refine",
  verbose: true,
  questionPrompt: SUMMARY_PROMPT,
  refinePrompt: SUMMARY_REFINE_PROMPT,
});

const run = async () => {
  const docs = await loader.load();
  const docsSummary = await splitter.splitDocuments(docs);

  const summary = await summarizeChain.run(docsSummary);

  console.log(summary);
};

run();
