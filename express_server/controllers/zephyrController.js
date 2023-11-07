/**
 * Zephyr LLM: "A 7B GPT-like model fint tuned from the mistralai/Mistral-7B-v0.1 model"
 * - HuggingFace Docs: https://huggingface.co/HuggingFaceH4/zephyr-7b-beta
 * - Zephyr Docs: 
 * Huggingface Spaces/Hardware/RateLimits: https://huggingface.co/pricing#hub
 * The free version allows for CPU Basic with 2vCPU's and 16GB of Memory for $0.00
 */

const {
  fetchMistralResponse,
} = require("../controller_functions/mistralPromptAndFilterResponse");
const zephyrURL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

// Zephyr Controller
const postQuery = async (req, res) => {
  const prompt = req.body.data.query; // this will be an array object
  let response = "";
  try {
    // await tokenValidation(prompt);
    response = await fetchMistralResponse(prompt, zephyrURL);
    if (response) {
      res.status(200).json(response);
      return;
    }
  } catch (error) {
    console.error("Zephyr Server Error: ", error);
    res
      .status(400)
      .json(
        "Zephyr server error. Server may be down or the prompt object was empty"
      );
    return;
  }
};

module.exports = {
  postQuery,
};
