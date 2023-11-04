/**
 * Mistralai LLM: "A instruct fine-tuned version of the Mistral-7B-v0.1 generative text model"
 * - HuggingFace Docs: https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1
 * - MistralAI Docs: https://docs.mistral.ai/
 */

// const fs = require("fs"); // could use this to log the conversations
require("dotenv").config();
const { mistralResponse } = require("../controller_functions/mistralFilterResponse");
const { tokenValidation } = require("../controller_functions/tokenValidation");
const mistralaiAPI =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

// Mistralai Controller
const postQuery = async (req, res) => {
  const prompt = req.body.data.query; // this will be an array object
  console.log("MistralAI Prompt: ", prompt);
  await tokenValidation(prompt);

  const response = await fetch(mistralaiAPI, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({
      inputs: prompt,
      max_tokens: 1000,
      stop: ".",
      // options: {
      //   padding_side: "left",
      //   max_new_tokens: 800,
      //   min_new_tokens: 50,
      //   do_sample: true,
      //   attention_mask: [1],
      // },
    }),
  });
  const result = await response.json();
  console.log("MistralAI Express Result: ", result);
  const filteredResponse = mistralResponse(prompt, result);
  return res.status(200).json(filteredResponse);
};

module.exports = {
  postQuery,
};
