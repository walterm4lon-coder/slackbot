const axios = require("axios");

require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/walter-poke", async ({ ack, respond }) => {
  await ack();

  await respond("Pong!");
});

app.command("/walter-help", async ({ ack, respond }) => {
  await ack();

  await respond({
    text: `Available Commands:
/walter-poke - Check bot latency
/walter-catfact - Get a cat fact`
  });
});

(async () => {
  await app.start();
  console.log("Bot is running!");
})();

app.command("/walter-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/walter-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});