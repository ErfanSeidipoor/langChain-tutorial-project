import { RunnableLambda } from "@langchain/core/runnables";
import { dispatchCustomEvent } from "@langchain/core/callbacks/dispatch";

(async function () {
  const reflect = RunnableLambda.from(async (value: string) => {
    await dispatchCustomEvent("event1", {
      reverse: value.split("").reverse().join(""),
    });

    await dispatchCustomEvent("event2", 5);

    return value;
  });

  const eventStream = await reflect.streamEvents("hello world", {
    version: "v2",
  });

  for await (const event of eventStream) {
    if (event.event === "on_custom_event") {
      console.log("Event 1:", event.data);
    }
  }
})();
