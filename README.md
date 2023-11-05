github https: https://github.com/hickamt/React-Express-Template.git

# React / Express Application Template

Quickly set up a React application with a basic ExpressJS server.

## Clone Repository

1. Click on the Green 'Code' button and copy HTTPS url
2. From your terminal (in the root directory you want to clone this to)

```bash
$ git clone https://github.com/hickamt/ChatBot-App.git
```

3. Then, login to GitHub and create a new repository
4. Give the new repo a name but leave it public and do NOT add a license (just continue)
5. Back in your terminal type the following:

```bash
$ git remote rename origin <give remote a new name>
```

```bash
$ git remote add origin <Your HTTPS GitHub Repo URL>
```

```bash
$ git branch -M main
```

```bash
$ git push -u origin main
```

And last, you should use `git checkout -b <branchName>` to make changes to the repo on another branch.

## SetUp

Quickly install all dependencies for the client and server directories using:

```bash
$ npm run setup
```

## Environment Variables

This application uses the [Huggingface API in the Express Server](https://huggingface.co/) to access the Large Language Models (LLM). You will need to create a new (.env) file at the root of /express_server.

- [Express Server /root (create .env here)](./express_server/)
- [Huggingface Home Page (sign up)](https://huggingface.co/)
- [Huggingface API Token (get API Token)](https://huggingface.co/settings/tokens)

```js
// Name your api token in the .env as follows
HUGGINGFACE_API_TOKEN = "apiTokenBetweenDoubleQuotes";
```

## Run Developer Mode

Run the following command to initiate the development mode. This should spin up:

- React server (localhost:5173)
- Express server (localhost:5500)

```bash
$ npm run dev
```

## Other NPM Scripts

In the /package.json file there are a few other scripts that you might use or modify:

```bash
# Each script uses ( $ npm run <scriptName> )
  "save": "git add . && git commit -m 'quick save'",
  "devcode": "code . && npm run dev",
  "dev": "concurrently \"npm run server\" \"npm run client\" ",
```
