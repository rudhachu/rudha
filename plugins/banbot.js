const { command, isPrivate } = require("../lib/");
const { parsedJid } = require("../lib/functions");
const { banUser, unbanUser, isBanned } = require("../lib/database/ban");
command({
    on: "message",
    fromMe: true,
    dontAddCommandList: true,
  },
  async (message, match) => {
    if (!message.isBaileys) return;
    const isban = await isBanned(message.jid);
    if (!isban) return;
    await message.reply("_rudhra is banned in this chat_");
    const jid = parsedJid(message.participant);
    return await message.client.groupParticipantsUpdate(
      message.jid,
      jid,
      "remove"
    );
  }
);

command({
    pattern: "botoff",
    fromMe: true,
    desc: "ban bot from a chat",
    type: "user",
  },
  async (message, match) => {
    const chatid = message.jid;
    const isban = await isBanned(chatid);
    if (isban) {
      return await message.sendMessage(message.jid, "rudhra already banned in current chat.");
    }
    await banUser(chatid);
    return await message.sendMessage(message.jid, "rudhra successfully banned from the chat.");
  }
);

command({
    pattern: "boton",
    fromMe: true,
    desc: "Unban bot from a chat",
    type: "user",
  },
  async (message, match) => {
    const chatid = message.jid;
    const isban = await isBanned(chatid);
    if (!isban) {
      return await message.sendMessage(message.jid, "rudhra is not banned in this chat.");
    }
    await unbanUser(chatid);
    return await message.sendMessage(message.jid, "rudhra can now be used in this chat.");
  }
);
