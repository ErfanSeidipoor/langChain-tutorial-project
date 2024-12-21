import {
  HumanMessage,
  ToolMessage,
  AIMessage,
  BaseMessage,
} from "@langchain/core/messages";

export function logAgentMessages(result: {
  messages: (HumanMessage | AIMessage | ToolMessage | BaseMessage)[];
}) {
  console.log("\n\n/* ------------------------------------- */");
  console.log("/* --------------- Start --------------- */");
  console.log("/* ------------------------------------- */");

  if (result.messages && Array.isArray(result.messages)) {
    result.messages.forEach(
      (message: HumanMessage | AIMessage | ToolMessage) => {
        if ("content" in message) {
          if (message instanceof HumanMessage) {
            console.log("\n\n/* --------------- ", "HumanMessage\n");
            console.dir(message.content, { depth: null });
          } else if (message instanceof AIMessage) {
            console.log("\n\n/* --------------- ", "AIMessage\n");
          } else if (message instanceof ToolMessage) {
            console.log("\n\n/* --------------- ", "ToolMessage\n");
          }

          console.log(`Content:`);
          if (isJSON(message.content.toString())) {
            console.dir(JSON.parse(message.content.toString()), {
              depth: null,
            });
          } else {
            console.dir({ content: message.content }, { depth: null });
          }

          if ("tool_calls" in message) {
            if (message.tool_calls!.length > 0) {
              console.log("Tool Calls:");
              message.tool_calls!.forEach((toolCall) => {
                console.log(`- Tool Name: ${toolCall.name}`);
                console.log(`  Args:`);
                console.dir(toolCall.args, { depth: null });
              });
            } else {
              console.log("No Tool Calls.");
            }
          }
        } else {
          console.log("Message has no content.");
        }
      }
    );
  } else {
    console.error("Unexpected result format:", result);
  }

  console.log("\n\n/* ------------------------------------- */");
  console.log("/* ---------------  End  --------------- */");
  console.log("/* ------------------------------------- */\n\n");

  function isJSON(string: string) {
    try {
      JSON.parse(string);
      return true;
    } catch (error) {
      return false;
    }
  }
}
