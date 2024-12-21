import {
  BaseRetriever,
  type BaseRetrieverInput,
} from "@langchain/core/retrievers";
import type { CallbackManagerForRetrieverRun } from "@langchain/core/callbacks/manager";
import { Document, DocumentInterface } from "@langchain/core/documents";

export interface CustomRetrieverInput extends BaseRetrieverInput {}

export class CustomRetriever extends BaseRetriever {
  lc_namespace: string[] = ["langchain", "retrievers"];

  constructor(fields?: CustomRetrieverInput) {
    super(fields);
  }

  async _getRelevantDocuments(
    query: string,
    runManager?: CallbackManagerForRetrieverRun
  ): Promise<Document[]> {
    return [
      new Document({
        pageContent: `Some document pertaining to ${query}`,
        metadata: {},
      }),
      new Document({
        pageContent: `Some other document pertaining to ${query}`,
        metadata: {},
      }),
    ];
  }
}

(async function () {
  const retriever = new CustomRetriever({});
  const retrievedDocs = await retriever.invoke("LangChain docs");

  console.log({ retrievedDocs });
})();
