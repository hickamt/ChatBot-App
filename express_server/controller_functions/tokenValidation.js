const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// Tokenizers Docs: https://naturalnode.github.io/natural/Tokenizers.html
// Library evaluates the prompt and returns the total number of tokens
// required to make up the prompt. I am not sure if this is could be
// considered an exact token count for any model or a general idea of the
// number of tokens that make up a prompt.
const tokenValidation = async function dialogGPTTokenValidation(prompts) {

  let totalTokens = 0;
  for (const prompt of prompts) {
    const tokens = await tokenizer.tokenize(prompt);
    totalTokens += tokens.length;
  }
  console.log("Token Prompt Key Total: ", totalTokens)
  return totalTokens;
}

module.exports = {
  tokenValidation,
};