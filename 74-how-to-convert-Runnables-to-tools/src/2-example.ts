import { RunnableLambda } from "@langchain/core/runnables";
import { z } from "zod";

(async function () {
  const firstRunnable = RunnableLambda.from<string, string>((input) => {
    return input + "a";
  });

  const secondRunnable = RunnableLambda.from<string, string>((input) => {
    return input + "z";
  });

  const runnable = firstRunnable.pipe(secondRunnable);
  const asTool = runnable.asTool({
    name: "append_letters",
    description: "Adds letters to a string.",
    schema: z.string(),
  });

  console.log(asTool.description);

  const response = await asTool.invoke("b");

  console.log(response);
})();
