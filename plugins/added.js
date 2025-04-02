const { command, isPrivate, serialize, parsedJid, getBuffer } = require("../lib")
const axios = require("axios")
const util = require("util")
const fs = require("fs")

command({ 
            pattern: "wa",
            fromMe: isPrivate, 
            desc: "Makes wa.me of quoted or mentioned user.",
            type: "tools"
    }, async(message, match) => { 
    //let users = match || message.reply_message.jid
    if (match) {
      let emp = match.replace(/[^0-9]/g, "")
      await message.reply(`Here you go\n\thttps://wa.me/${emp}`)
    } else {
    let jid = message.reply_message.jid.split("@")[0]
    return message.reply(`https://wa.me/${jid}`)
}
    });


command({ 
    on: "evall" 
  }, async (message, match) => {
  try {
    if (message.sudo && message.body.startsWith('>')) { 
      let code = match.slice(2) 
      if (!code) {
        await message.reply(`You need to provide a query to run!`);
        return;
        }
      let resultTest = eval(match);
      if (typeof resultTest === "object") {
        message.reply(util.format(resultTest)); 
        } else {
            message.reply(util.format(resultTest));
            }}
    if (message.sudo && message.body.startsWith('$')) {
      let code = match.slice(2)
      if (!code) {
        await message.reply(`You need to provide a query to run!`); 
        return;
        }
      let resultTest = await eval('const a = async()=>{\n' + code + '\n}\na()');
      let h = util.format(resultTest);
      if(h===undefined) { return console.log(h) } 
        else {
            await message.reply(h)}
             }
    } catch (err) {
      console.log(err)
      await message.reply(util.format(err));
    }
  }
) 
