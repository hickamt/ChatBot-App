/**
 * EleutherAI: The GPT-NeoX-20B is a autoregressive language model trained on the Pile GPT-NeoX library.
 * - EleutherAI Home: https://www.eleuther.ai/
 * - HuggingFace Docs: https://huggingface.co/EleutherAI/gpt-neox-20b
 */

// const fs = require("fs"); // could use this to log the conversations
require("dotenv").config();
const { tokenValidation } = require("../controller_functions/tokenValidation");
const eleutherURL =
  "https://api-inference.huggingface.co/models/EleutherAI/gpt-neox-20b";
const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

// EleutherAI Controller
const postQuery = async (req, res) => {
  const prompt = req.body.data.query; // this will be an array object
  console.log("EleutherAI Express-Side Prompt: ", prompt);
  // return res.status(200).json({ message: "Success" });
  await tokenValidation(prompt);

  const response = await fetch(eleutherURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({
      inputs: prompt,
    }),
  });
  const result = await response.json();
  console.log("Eleuther Express-Side Response: ", result);
  return res.status(200).json(result);
};

module.exports = {
  postQuery,
};
