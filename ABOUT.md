# Using React/Express to Create Interactive Chat Application

This is a basic template for a React client and Express backend. It's intended use is to generate an interactive environment for users and one or more chatbots as part of a graduate capstone project at Portland State University 2023-2024.

## Tokens | How are they calculated?

My Question: "Is a single character considered one token when using DialoGPT?"

GitHub CoPilot (GH): No, one character is not equal to one token in DialoGPT. DialoGPT, like many other language models, uses a tokenizer to break down input text into smaller pieces, or tokens. These tokens can be as short as one character or as long as one word.

For example, the word "chatbot" might be a single token, while the word "a" might also be a single token. The exact number of tokens for a given piece of text can vary depending on the specific tokenizer used.

In the context of DialoGPT, it uses a variant of the Byte Pair Encoding (BPE) tokenizer. This tokenizer can break words into subwords if the word is not in its vocabulary. For example, the word "chatbot" might be broken down into "chat" and "bot" if "chatbot" is not in its vocabulary.

It's also important to note that there's a maximum limit of tokens that DialoGPT can handle in a single prompt, which is 1024 tokens.

## Test Prompt Used

For each of the three LLM's I used the following prompt which uses 169 tokens:

```bash
# DialoGPT allows an array of prompts delimited by ','
const prompt = [
  "Hi, sorry to keep bothering you, but I still haven't received my order. I was wondering if you could check on it for me?",
  "I'll get right one that. What was your name?",
  "Todd, did you find it?",
];

# MistralAI requires a string which is delimited (I used the template literal syntax)
const prompt = `"[TODD] Hi, I'm Todd and I am testing my new communication skills using NodeJS. [/TODD]"
    "[ASST] Well, I wish you the best of luck in your quest for better communication. [/ASST]"
    "[TODD] Thank you! How many languages do speak? [/TODD]"`;
```

## DialoGPT

DialoGPT is a Microsoft large scale pretrained response generation model.

- [DialoGPT: Huggingface Docs](https://huggingface.co/microsoft/DialoGPT-large?text=Hey+my+name+is+Julien%21+How+are+you%3F)
- [DialoGPT: GitHub Docs](https://github.com/microsoft/DialoGPT)

The prompt can be a `string` or an `array = ["first message", "second message", ...]`

Token Limit: 1024, which includes prompt in and response out.

To get around this for large prompts the input should be generated in packets. First packet could be history or (fact sheet) broken up into seperate parts and ending with the last prompt which would be the `prompt` itself.

```bash
# Example of prompt result
DialoGPT Result:  [
  {
    generated_text: 'I can check it for you.',
    conversation: { generated_responses: [Array], past_user_inputs: [Array] }
  },
  {
    generated_text: 'I was the one with the red hair.',
    conversation: { generated_responses: [Array], past_user_inputs: [Array] }
  },
  {
    generated_text: 'I did!',
    conversation: { generated_responses: [Array], past_user_inputs: [Array] }
  }
]

```

## MistralAI

MistralAI is an instruct fine-tuned version of Mistral-7B-v0.1 generative text model. This LLM gives much more feedback when prompted than I could get from `dialoGPT`.

- [MistralAI: Huggingface Docs](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1)
- [MistralAI: GitHub Docs](https://github.com/huggingface/transformers)

```bash
# Example of prompt result
MistralAI Result:  [
  {
    generated_text: `"[TODD] Hi, I'm Todd and I am testing my new communication skills using NodeJS. [/TODD]"\n` +
      '    "[ASST] Well, I wish you the best of luck in your quest for better communication. [/ASST]"\n' +
      '    "[TODD] Thank you! How many languages do speak? [/TODD]"\n' +
      '    "[ASST] I speak English. How can I assist you today? [/T'
  }
]
```
