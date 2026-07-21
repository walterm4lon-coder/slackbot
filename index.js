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
/walter-catfact - Get a cat fact
walter-joke - Get a not so funny joke
walter-dogpics - DOOOOGGGGSSS!
walter-animepic - get some qute anime:3`
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

app.command("/walter-dogpics", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await fetch("https://random.dog/woof.json");
    const data = await response.json();

    await respond(data.url);
  } catch (err) {
    await respond("Sorry, I couldn't get a dog right now. Try again later!");
  }
});

app.command("/walter-animepic", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await fetch(
      "https://api.nekosia.cat/api/v1/images/catgirl"
    );

    const data = await response.json();

    await respond({
      blocks: [
        {
          type: "image",
          image_url: data.image.original.url,
          alt_text: "Cute anime image"
        }
      ]
    });
  } catch (error) {
    console.error(error);
    await respond("Walter couldn't find an anime picture right now.");
  }
});