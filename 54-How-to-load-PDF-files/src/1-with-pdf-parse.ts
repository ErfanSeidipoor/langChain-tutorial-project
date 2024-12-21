import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

(async function () {
  // one document per file
  const loader1 = new PDFLoader("./bitcoin.pdf", { splitPages: false });

  const docs1 = await loader1.load();

  console.dir({ docs1, length: docs1.length }, { depth: null });

  // one document per page
  const loader2 = new PDFLoader("./bitcoin.pdf");

  const docs2 = await loader2.load();

  console.dir({ docs2, length: docs2.length }, { depth: null });
})();
