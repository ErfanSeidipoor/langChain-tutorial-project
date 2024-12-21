import { ChromaTranslator } from "@langchain/community/structured_query/chroma";
import {
  Comparator,
  Comparison,
  Operation,
  Operator,
} from "langchain/chains/query_constructor/ir";
import { z } from "zod";

(async function () {
  const searchSchema = z.object({
    query: z.string(),
    startYear: z.number().optional(),
    author: z.string().optional(),
  });

  const searchQuery: z.infer<typeof searchSchema> = {
    query: "RAG",
    startYear: 2022,
    author: "LangChain",
  };

  function constructComparisons(
    query: z.infer<typeof searchSchema>
  ): Comparison[] {
    const comparisons: Comparison[] = [];
    if (query.startYear !== undefined) {
      comparisons.push(
        new Comparison("gt" as Comparator, "start_year", query.startYear)
      );
    }
    if (query.author !== undefined) {
      comparisons.push(
        new Comparison("eq" as Comparator, "author", query.author)
      );
    }
    return comparisons;
  }

  const comparisons = constructComparisons(searchQuery);
  const _filter = new Operation("and" as Operator, comparisons);

  const response = new ChromaTranslator().visitOperation(_filter);

  console.dir({ response }, { depth: null });
})();
