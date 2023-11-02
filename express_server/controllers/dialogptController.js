/**
 * DialoGPT LLM: "A state-of-the-art large-scale pretrained response generation model."
 * - HuggingFace Docs: https://huggingface.co/microsoft/DialoGPT-large?text=Hey+my+name+is+Julien%21+How+are+you%3F
 * - GitHub Docs: https://github.com/microsoft/DialoGPT
 * - Token Limit: 1024 (includes both input & output tokens. 1024 is the max for both)
 *   To continue using the api while limited to the 1024 tokens, we can chunk the prompt into the request
 *   or break down the size of the request(s).
 */

// const fs = require("fs"); // could use this to log the conversations
require("dotenv").config();
const { tokenValidation } = require("../controller_functions/tokenValidation");
const DIALOGPT_URL =
  "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large";
const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

// DialoGPT Controller
const postQuery = async (req, res) => {
  const prompt = req.body.data.query; // this will be an array object
  await tokenValidation(prompt);

  const response = await fetch(DIALOGPT_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({
      inputs: prompt,
      options: {
        padding_side: "left",
        pad_token_id: 50256,
        max_new_tokens: 200,
        attention_mask: [1],
      },
    }),
  });
  const result = await response.json();
  return res.status(200).json(result);
};

module.exports = {
  postQuery,
};
