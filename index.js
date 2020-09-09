const SlackBot = require("slackbots");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: "dicionario consciente",
});

bot.on("start", () => {
  const params = {
    icon_emoji: ":robot_face:",
  };

  // bot.postMessageToChannel(
  //   "random",
  //   "Get inspired while working with @inspirenuggets",
  //   params
  // );
});

bot.on("error", (err) => {
  console.log(err);
});

// Message Handler
bot.on("message", (data) => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text);
});

function handleMessage(message) {
  return message;
}
