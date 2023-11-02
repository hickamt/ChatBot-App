const bos_token = "<s>";
const eos_token = "</s>";

// Rebuilding the jinja template in javascript
const jinJS = function jinJS(messages) {
  let tempMessage = messages.map((message) => {
    switch (message.role) {
      case "user":
        return bos_token + "[INST] " + message.content.trim() + " [/INST]";
      case "system":
        return "<<SYS>>\\n" + message.content.trim() + "\\n<</SYS>>\\n\\n";
      case "assistant":
        return "[ASST] " + message.content + " [/ASST]" + eos_token;
      default:
        return "<<SYS>>\\n" + message.content.trim() + "\\n<</SYS>>\\n\\n";
    }
  });
  return tempMessage;
};

module.exports = {
  jinJS,
};

/* 
input:
    {"role": "user", "content": "What is your favourite condiment?"},
    {"role": "assistant", "content": "Well, I'm quite partial to a good squeeze of fresh lemon juice. It adds just the right amount of zesty flavour to whatever I'm cooking up in the kitchen!"},
    {"role": "user", "content": "Do you have mayonnaise recipes?"}
output:
    <s>[INST] What is your favourite condiment? [/INST]
    [ASST] Well, I'm quite partial to a good squeeze of fresh lemon juice. It adds just the right amount of zesty flavour to whatever I'm cooking up in the kitchen! [/ASST]</s>
    <s>[INST] Do you have mayonnaise recipes? [/INST]
*/
