const isVPS = !(__dirname.startsWith("/rudhra-bot") || __dirname.startsWith("/skl"));
const isHeroku = __dirname.startsWith("/rudhra-bot");
const isKoyeb = __dirname.startsWith("/rudhra-bot");
const isRailway = __dirname.startsWith("/rudhra-bot");
const { Sequelize } = require("sequelize");
const fs = require("fs");
//require("dotenv").config();
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

const toBool = (x) => x === "true";

const DATABASE_URL = process.env.DATABASE_URL || "./assets/database.db";
const ACR_A = process.env.ACR_A || "ff489a0160188cf5f0750eaf486eee74";
const ACR_S = process.env.ACR_A || "ytu3AdkCu7fkRVuENhXxs9jsOW4YJtDXimAWMpJp";
global.website = "https://whatsapp.com/channel/0029Vag5l2ALSmbi14YryJ2r"
module.exports = {
  ANTILINK: process.env.ANTI_LINK || "on", //on or off
  LOGS: toBool(process.env.LOGS) || true,
  ANTI_LINK_ACTION: process.env.ANTI_LINK_ACTION || "delete", //delete or kick
  MENTION: process.env.MENTION || "enable",
  SESSION_ID: process.env.SESSION_ID || "null",//Session ID here
  LANG: process.env.LANG || "EN",//Only English currently supported
  HANDLERS: process.env.HANDLER === "false" || process.env.HANDLER === "null" ? "^" : "^[/]",
  RMBG_KEY: process.env.RMBG_KEY || false,
  PLATFORM:isHeroku?"Heroku":isRailway?"Railway":isKoyeb?"Koyeb":"Other server",isHeroku,isKoyeb,isVPS,isRailway,
  BRANCH: "main",
  WARN_COUNT: 3,
  PACKNAME: process.env.PACKNAME || "ʀᴜᴅʜʀᴀ-ʙᴏᴛ",
  PRESENCE: process.env.PRESENCE || "unavailable", // composing | recording | available | unavailable
  BOT_INFO: process.env.BOT_INFO || "ʀᴜᴅʜʀᴀ ʙᴏᴛ;Ƥ ʀ ɪ ɴ ᴄ ᴇ  Ʀ ᴜ ᴅ ʜ;https://raw.githubusercontent.com/rudhraan/media/main/image/rudhra2.jpg",
  WELCOME_MSG: process.env.WELCOME_MSG || `Hi @user Welcome to @gname\n\nʀᴜᴅʜʀᴀ-ʙᴏᴛ`,
  GOODBYE_MSG: process.env.GOODBYE_MSG || `Hi @user It was Nice Seeing you\n\nʀᴜᴅʜʀᴀ-ʙᴏᴛ`,
  AUTHOR: process.env.AUTHOR || "ʀᴜᴅʜʀᴀ-ʙᴏᴛ",
  SUDO: process.env.SUDO || "919895809960",//Also sudo numbers
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "919895809960",
  OWNER_NAME: process.env.OWNER_NAME || "ʀᴜᴅʜʀᴀ-ʙᴏᴛ",
  HEROKU: toBool(process.env.HEROKU) || true,
  BOT_NAME: process.env.BOT_NAME || "ʀᴜᴅʜʀᴀ-ʙᴏᴛ",
  STICKER_DATA: process.env.STICKER_DATA || "Ʀ ᴜ ᴅ ʜ ʀ λ;Ƥ ʀ ɪ ɴ ᴄ ᴇ  Ʀ ᴜ ᴅ ʜ",
  AUDIO_DATA: process.env.AUDIO_DATA || "Ʀ ᴜ ᴅ ʜ ʀ λ;Ƥ ʀ ɪ ɴ ᴄ ᴇ  Ʀ ᴜ ᴅ ʜ;https://raw.githubusercontent.com/rudhra-prh/media/main/image/rudhra2.jpg",
  PROCESSNAME: process.env.PROCESSNAME || "ʀᴜᴅʜʀᴀ-ʙᴏᴛ",
  MODE: process.env.MODE || "private",
  ANTIDELETE: toBool(process.env.DELETED_LOG) || false,
  REMOVEBG : process.env.REMOVEBG || false,
  DATABASE_URL: DATABASE_URL,
  STATUS_SAVER: toBool(process.env.STATUS_SAVER) || true, //make true to auto send status
  DATABASE:
    DATABASE_URL === "./database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
