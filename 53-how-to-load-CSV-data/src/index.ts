import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";

(async function () {
  const loader = new CSVLoader(
    "./example.csv"
    // extracting a single column { column: "text" }
  );

  const docs = await loader.load();

  console.dir({ docs }, { depth: null });
})();
