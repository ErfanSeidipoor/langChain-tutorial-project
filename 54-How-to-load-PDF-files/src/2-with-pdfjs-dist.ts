import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

(async function () {
  const loader = new PDFLoader("./bitcoin.pdf", {
    pdfjs: () => import("pdfjs-dist/legacy/build/pdf.js"),
  });

  const docs = await loader.load();

  console.dir({ docs }, { depth: null });
})();
