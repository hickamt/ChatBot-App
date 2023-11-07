/**
 * Mistralai LLM: "A instruct fine-tuned version of the Mistral-7B-v0.1 generative text model"
 * - HuggingFace Docs: https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1
 * - MistralAI Docs: https://docs.mistral.ai/
 * Huggingface Spaces/Hardware/RateLimits: https://huggingface.co/pricing#hub
 * The free version allows for CPU Basic with 2vCPU's and 16GB of Memory for $0.00
 */

const { tokenValidation } = require("./tokenValidation");
require("dotenv").config();

// This function will use the prompt to find the beginning of the response.generated_text.
// The generated_text contains the original prompt, so we can use that to find the beginning of the response.
// The response will be the generated_text, but with the prompt removed.
const filterResponse = function mistralResponseFilter(prompt, response) {
  let temp = response[0].generated_text;
  temp = response[0].generated_text.replace(prompt, "");
  return temp;
};

/**
 * Fetch request using 'POST' where the 'prompt' object is the body: input
 * Request is made to MistralAI using Huggingface API endpoint and API TOKEN
 * Each request is filtered to remove the previous user 'prompt' string from
 * the response object.
 * @param {string} prompt
 * @returns the generated response data string
 */
const fetchResponse = async function fetchMistralResponseData(prompt, URL) {
  const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
  let filteredResponse = [];
  try {
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify({
        inputs: prompt,
      }),
    });
    if (response) {
      console.log("Server Status Code: ", response.status);
      console.log("Server Status Message: ", response.statusText);
      // console.log("Server Response Object: ", response);
      let jsonResponse = await response.json();

      // Filters out the previous prompt string from current response
      filteredResponse = filterResponse(prompt, jsonResponse);
    }
  } catch (error) {
    console.error(error);
    throw new Error({ message: "Mistral AI Fetch Error" });
  }
  return filteredResponse;
};

// Validate if the response has terminated with end of sentence qualifier: [ ".", "!", "?"]
// Return TRUE if end of sentence qualifier is found. Return FALSE for all other cases.
const isEndOfSentence = function validateIfResponseIsCompleted(response) {
  // End of sentence character (EOSCHAR)
  let EOSCHAR = response.charAt(response.length - 1);
  if (EOSCHAR === "." || EOSCHAR === "!" || EOSCHAR === "?") {
    console.log("Found end of sentence qualifier: ", EOSCHAR);
    return true;
  }
  return false;
};

// Attempts to validate if the responses are being repeated which indicates the end
// of valid chat reponse.
const isRepeating = function isResponseRepeating(
  previousPrompt,
  currentResponse
) {
  console.log(
    "Repeating code previous Prompt is: ",
    previousPrompt,
    " current response is: ",
    currentResponse
  );
  return previousPrompt === currentResponse ? true : false;
};

// If the response generated does not have an end of sentence qualifier
// (i.e. ".", "!", or "?") then continue prompting MistralAI until either
// - and end of sentence qualifier is found
// - the number of prompt iterations exceeds 10
// return the response with the concatenated results
const fetchMistralResponse = async function continuousFetchResponseGenerator(
  prompt,
  URL
) {
  const MAX_ITERATIONS = 10;
  let iteration = 0;
  let completedResponse = "";
  // Create the initial response object and validate if a response
  // was generated
  let response = await fetchResponse(prompt, URL);
  if (!response) {
    completedResponse += "Sorry, the response object was empty";
    return;
  }

  // Continue prompting chatbot until:
  // - End of sentence qualifier is found, OR
  // - Max iterations have been reached, OR
  // - Chatbot responses become repeating
  while (response && iteration < MAX_ITERATIONS) {
    console.log("Iteration [", iteration, "] Inital Prompt: ", prompt);
    console.log("Iteration [", iteration, "] Pre Filter Response: ", response);
    // Calculate and console the number of tokens in prompt
    await tokenValidation(prompt);
    // Hold the response value to validate if responses are being repeated
    let previouseResponse = response;
    // Validate response for end of sentence qualifier
    if (isEndOfSentence(response) === true) {
      iteration = MAX_ITERATIONS;
      return (completedResponse += response);
    }

    // concat response before another: fetch(prompt) -> response cycle
    completedResponse += response;
    response = await fetchResponse(response, URL);
    ++iteration;

    // verify that the previousResponse is not the same as this new response string
    if (isRepeating(previouseResponse, response)) {
      iteration = MAX_ITERATIONS;
      return completedResponse;
    }
  }

  return completedResponse;
};

module.exports = {
  filterResponse,
  fetchResponse,
  fetchMistralResponse,
};
