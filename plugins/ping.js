const { fromBuffer, mimeTypes } = require("file-type");
const { command, isPrivate } = require("../lib/");
const speed = require('performance-now');
let timestamp = speed()
let latency = speed() - timestamp

command({
    pattern: "ping",
    fromMe: isPrivate,
    desc: "To check ping",
    type: "user",
  },
    async (message, match) => {
    await message.reply("*Hello 👋*");
    await message.reply(`*Response: ${latency} secs*`);
  }
);
