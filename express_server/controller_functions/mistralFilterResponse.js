const mistralaiAPI =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1";
// "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

// This function will use the prompt to find the beginning of the response.generated_text.
// The generated_text contains the original prompt, so we can use that to find the beginning of the response.
// The response will be the generated_text, but with the prompt removed.
// The response will be sent to the client.
const filterResponse = function mistralResponseFilter(prompt, response) {
  let temp = response[0].generated_text;
  temp = response[0].generated_text.replace(prompt, "");
  return temp;
};

// Fetch Response uses a POST request that requires a prompt: 'string'
const fetchResponse = async function fetchMistralResponseData(prompt) {
  const response = await fetch(mistralaiAPI, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({
      inputs: prompt,
      // options: {
      //   padding_side: "left",
      //   max_new_tokens: 800,
      //   min_new_tokens: 50,
      //   attention_mask: [1],
      // },
    }),
  });
  let filteredResponse = filterResponse(prompt, await response.json());
  return filteredResponse;
};

// If the response generated does not have an end of sentence qualifier
// (i.e. ".", "!", or "?") then continue prompting MistralAI until either
// - and end of sentence qualifier is found
// - the number of prompt iterations exceeds 10
// return the response with the concatenated results as
// response = [{generated_text: "first " + " second " + " ... " + " n < 10 "}]
const getFullResponse = async function continuedPromptFetchResponseGeneration(
  prompt
) {
  const MAX_ITERATIONS = 10;
  let completeResponse = [{ generated_text: "" }];
  let response = await fetchResponse(prompt);
  let iteration = 0;

  while (response && iteration < MAX_ITERATIONS) {
    // Validation and default return
    if (!response) {
      completeResponse[0].generated_text += "Sorry, let's try that again";
      return completeResponse[0].generated_text;
    }

    ++iteration;
    // Evaluate if response has end of sentence qualifier, else continue prompting for full response

    // Need to use IF() conditions that will also catch beginning of response using "##"
    // abstract these validations
    switch (response.charAt(response.length - 1)) {
      case ".":
      case "!":
      case "?":
        iteration = MAX_ITERATIONS;
        completeResponse[0].generated_text += response;
        console.log("End of sentence found in response.");
        break;
      default:
        let firstResponse = response;
        completeResponse[0].generated_text += response;
        console.log("[", iteration, "] Response before filter: ", response);
        response = await fetchResponse(response);
        if (firstResponse === response) {
          console.log(
            "FIRST RESPONSE IS EQUAL TO FILTERED RESPONSE, ending loop"
          );
          iteration = MAX_ITERATIONS;
        }
        console.log("[", iteration, "] Response after filter: ", response);
        break;
    }
  }

  return (completeResponse[0].generated_text += response);
};

module.exports = {
  filterResponse,
  fetchResponse,
  getFullResponse,
};
