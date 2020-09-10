const SlackBot = require("slackbots");
const axios = require("axios");
const dotenv = require("dotenv");

const terms = require("./terms");

let usedTerms = [];

console.log(terms);

dotenv.config();

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  signingSecret: process.env.SIGNING_SECRET,
  name: "dicionarioconsciente",
});

bot.on("start", () => {
  // bot.postMessageToChannel("geral", "Bot teste");
});

bot.on("error", (err) => {
  console.log(err);
});

bot.on("message", (data) => {
  if (data.type == "message") {
    handleMessage(data.user, data.text);
  } else if (data.type == "desktop_notification") {
    handleAppMention(data.channel);
  }
});

const handleAppMention = (channelId) => {
  let message = "";
  if (usedTerms.length > 0) {
    message =
      "Segue a relação de quantas vezes cada expressão foi utilizada: \n\n";
    usedTerms.forEach((item) => {
      message = `${message} ${item.term}: ${item.timesUsed}\n`;
    });
    usedTerms = [];
  } else {
    message = "Nenhuma expressão foi utilizada!";
  }
  sendMessageWithUsedTermsToChannel(channelId, message);
};

const handleMessage = (userId, text) => {
  terms.forEach((term) => {
    if (text.includes(term)) {
      updateUsedTerms(term);
      sendMessageWithTermToUser(userId, term);
    }
  });
};

const updateUsedTerms = (term) => {
  let hasBeenUsed = false;
  usedTerms.forEach((item) => {
    if (item.term === term) {
      hasBeenUsed = true;
      item.timesUsed++;
    }
  });
  if (!hasBeenUsed) {
    usedTerms.push({
      term: term,
      timesUsed: 1,
    });
  }
};

const sendMessageWithTermToUser = (userId, term) => {
  const message = `Oie, vimos que você utilizou a expressão "${term}" e ela desrespeita algumas pessoas, poderia editar a mensagem? Obrigadoooo`;
  bot.postMessage(userId, message);
};

const sendMessageWithUsedTermsToChannel = (channelId, message) => {
  bot.postMessage(channelId, message);
};
