const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

const tokenValidation = async function dialogGPTTokenValidation(prompts) {

  let totalTokens = 0;
  for (const prompt of prompts) {
    const tokens = await tokenizer.tokenize(prompt);
    totalTokens += tokens.length;
  }
  console.log("Total Tokens: ", totalTokens)
  return totalTokens;
}

module.exports = {
  tokenValidation,
};