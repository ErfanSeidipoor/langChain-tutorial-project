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

  await reflect.invoke("hello world", {
    callbacks: [
      {
        handleCustomEvent(eventname, data, runId) {
          console.log(eventname, data, runId);
        },
      },
    ],
  });
})();
