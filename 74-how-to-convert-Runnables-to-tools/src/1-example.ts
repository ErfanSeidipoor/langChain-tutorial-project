import { RunnableLambda } from "@langchain/core/runnables";
import { z } from "zod";

(async function () {
  const schema = z.object({
    a: z.number(),
    b: z.array(z.number()),
  });

  const runnable = RunnableLambda.from((input: z.infer<typeof schema>) => {
    return input.a * Math.max(...input.b);
  });

  const asTool = runnable.asTool({
    name: "My tool",
    description: "Explanation of when to use the tool.",
    schema,
  });

  console.log(asTool.description);

  const response = await asTool.invoke({ a: 3, b: [1, 2] });

  console.log(response);
})();
