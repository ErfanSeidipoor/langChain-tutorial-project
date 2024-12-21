import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

(async function () {
  console.log(RecursiveCharacterTextSplitter.getSeparatorsForLanguage("php"));

  const PHP_CODE = `<?php
  namespace foo;
  class Hello {
      public function __construct() { }
  }
  function hello() {
      echo "Hello World!";
  }
  interface Human {
      public function breath();
  }
  trait Foo { }
  enum Color
  {
      case Red;
      case Blue;
  }`;

  const phpSplitter = RecursiveCharacterTextSplitter.fromLanguage("php", {
    chunkSize: 60,
    chunkOverlap: 0,
  });

  const phpDocs = await phpSplitter.createDocuments([PHP_CODE]);

  console.log(phpDocs);
})();
