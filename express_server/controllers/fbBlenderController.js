/**
 * blenderbot by FaceBook: "A state-of-the-art large-scale pretrained response generation model."
 * - HuggingFace Docs: https://huggingface.co/facebook/blenderbot-400M-distill?text=Hey+my+name+is+Julien%21+How+are+you%3F
 *    Other blender url models: .../facebook/blenderbot-1Bdistill
 * - Token Limit: 1024 (includes both input & output tokens. 1024 is the max for both)
 *   To continue using the api while limited to the 1024 tokens, we can chunk the prompt into the request
 *   or break down the size of the request(s).
 */

// const fs = require("fs"); // could use this to log the conversations
require("dotenv").config();
const { tokenValidation } = require("../controller_functions/tokenValidation");
const fbBlenderURL =  "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

// Mistralai Controller
const postQuery = async (req, res) => {
  const prompt = req.body.data.query; // this will be an array object
  console.log("FB Blender Prompt: ", prompt);
  await tokenValidation(prompt);

  const response = await fetch(fbBlenderURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({
      inputs: prompt,
      options: {
        padding_side: "left",
        max_length: 300,
        min_length: 10,
        max_new_tokens: 300,
        attention_mask: [1],
      },
    }),
  });
  const result = await response.json();
  console.log("FB Blender Express Result: ", result);
  return res.status(200).json(result);
};

module.exports = {
  postQuery,
};
