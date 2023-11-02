
// This function will use the prompt to find the beginning of the response.generated_text.
// The generated_text contains the original prompt, so we can use that to find the beginning of the response.
// The response will be the generated_text, but with the prompt removed.
// The response will be sent to the client.
const mistralResponse = function mistralResponseFilter(prompt, response) {
  let temp = response[0].generated_text;
  temp = response[0].generated_text.replace(prompt, "");
  console.log("Temp after replace: ", temp);
  return temp;
}

module.exports = {
  mistralResponse,
};