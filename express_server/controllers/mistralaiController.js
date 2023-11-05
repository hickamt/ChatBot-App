/**
 * Mistralai LLM: "A instruct fine-tuned version of the Mistral-7B-v0.1 generative text model"
 * - HuggingFace Docs: https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1
 * - MistralAI Docs: https://docs.mistral.ai/
 * Huggingface Spaces/Hardware/RateLimits: https://huggingface.co/pricing#hub
 * The free version allows for CPU Basic with 2vCPU's and 16GB of Memory for $0.00
 */

const {
  fetchMistralResponse,
} = require("../controller_functions/mistralPromptAndFilterResponse");

// Mistralai Controller
const postQuery = async (req, res) => {
  const prompt = req.body.data.query; // this will be an array object
  let response = "";
  try {
    // await tokenValidation(prompt);
    response = await fetchMistralResponse(prompt);
    if (response) {
      res.status(200).json(response);
      return;
    }
  } catch (error) {
    console.error("MistralAI Error: ", error);
    res
      .status(400)
      .json(
        "Mistralai server error. Server may be down or the prompt object was empty"
      );
    return;
  }
};

module.exports = {
  postQuery,
};
