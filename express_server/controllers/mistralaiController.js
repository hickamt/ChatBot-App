/**
 * Mistralai LLM: "A instruct fine-tuned version of the Mistral-7B-v0.1 generative text model"
 * - HuggingFace Docs: https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1
 * - MistralAI Docs: https://docs.mistral.ai/
 */

require("dotenv").config();
const { getFullResponse } = require("../controller_functions/mistralFilterResponse");
const { tokenValidation } = require("../controller_functions/tokenValidation");

// Mistralai Controller
const postQuery = async (req, res) => {
  const prompt = req.body.data.query; // this will be an array object
  await tokenValidation(prompt);

  // FetchResponse = response[0].generated_text;
  const fetchResponse = await getFullResponse(prompt);
  return res.status(200).json(fetchResponse);
};

module.exports = {
  postQuery,
};
