const { command, commands } = require("./plugins");
let config = require("../config");
const axios = require("axios");
const cheerio = require("cheerio");
const OpenAI = require("openai");
const openai_api = "h";
const openai = new OpenAI({ apiKey: openai_api });

const pm2 = require("pm2");

const {
  getBuffer,
  decodeJid,
  parseJid,
  parsedJid,
  getJson,
  isIgUrl,
  isUrl,
  getUrl,
  qrcode,
  secondsToDHMS,
  igdl,
  formatBytes,
  sleep,
  clockString,
  runtime,
  AddMp3Meta,
  Bitly,
  isNumber,
  getRandom,
  findMusic,
  toAudio,
  readQr,
  getLyrics,
  isAdmin,
} = require("./functions");
const { serialize, downloadMedia } = require("./serialize");
const Greetings = require("./Greetings");;
const addExif = require('./ffmpeg');
module.exports = {
  toAudio,
  isPrivate: config.MODE.toLowerCase() === "private",
  Greetings,
  addExif,
  isAdmin,
  serialize,
  getLyrics,
  readQr,
  downloadMedia,
  Function: command,
  command,
  commands,
  getBuffer,
  decodeJid,
  parseJid,
  parsedJid,
  getJson,
  isIgUrl,
  isUrl,
  getUrl,
  qrcode,
  secondsToDHMS,
  formatBytes,
  igdl, 
  sleep,
  clockString,
  runtime,
  AddMp3Meta,
  Bitly,
  isNumber,
  getRandom,
  findMusic,
};
