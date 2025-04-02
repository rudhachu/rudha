const config = require("../config");
const { command, isPrivate, toAudio, addExif, AddMp3Meta, getBuffer } = require("../lib/");
const { webp2mp4, textToImg } = require("../lib/functions");

command({
    pattern: "sticker",
    fromMe: isPrivate,
    desc: "Converts Photo/video/text to sticker",
    type: "converter",
  },
  async (message, match, m) => {
    const isValid =
      message.reply_message.video ||
      message.reply_message.image ||
      message.reply_message.text ||
      message.reply_message.mimetype.includes("image");

    if (isValid) return await message.reply("_Reply to photo/video/text_");
    if (message.reply_message.text) {
      let buff = await textToImg(message.reply_message.text);
      return await message.sendMessage(
        message.jid,
        buff,
        { mimetype: "image/webp" },
        "stickerMessage"
      );
    }
    let buff = await m.quoted.download();
    message.sendMessage(
      message.jid,
      buff,
      { packname: config.STICKER_DATA.split(";")[0], author: config.STICKER_DATA.split(";")[1], },
      "sticker"
    );
  }
);

command({
  pattern: "take ?(.*)",
  fromMe: isPrivate,
  desc: "Change audio title, album/sticker author, packname",
  type: "converter",
}, async (message, match) => {
  if (!message.reply_message || !(message.reply_message.video || message.reply_message.audio || message.reply_message.sticker)) {
    return await message.reply("*_Reply to sticker/audio/voice/video!_*");
  }

  if (message.reply_message.audio || message.reply_message.video) {
   let media = await toAudio(await message.quoted.download("buffer"));
    
    let matchParts = match ? match.match(/[^,;]+/g) : [];
    let configParts = config.AUDIO_DATA.match(/[^,;]+/g);
    
    let url = matchParts[2] ? matchParts[2] : (configParts[2] ? configParts[2] : '');
    let cover = await getBuffer(url); 

    let title = matchParts[0] ? matchParts[0] : (configParts[0] ? configParts[0] : config.AUDIO_DATA);
    let artist = matchParts[1] ? matchParts[1] : (configParts[1] ? configParts[1] : config.AUDIO_DATA);
    artist = [artist]; // Ensure artist is an array

    const res = await AddMp3Meta(media, cover, {
      title: title,
      artist: artist
    });

    return await message.client.sendMessage(message.jid, {
      audio: res,
      mimetype: "audio/mpeg"
    }, {
      quoted: message.data
    });
  } else if (message.reply_message.sticker) {
    let q = await message.reply_message.download("buffer");
    let exif;
    if (match !== "") {
      const splitMatch = match.split(/[,;]/);
      exif = {
        author: splitMatch[1] ? splitMatch[1] : "",
        packname: splitMatch[0] ? splitMatch[0] : "",
        categories: config.STICKER_DATA.split(";")[2] || "",
        android: "https://github.com/princerudh/",
        ios: "https://github.com/princerudh/"
      };
    } else {
      exif = {
        author: config.STICKER_DATA.split(/[,;]/)[1] || "",
        packname: config.STICKER_DATA.split(/[,;]/)[0] || "",
        categories: config.STICKER_DATA.split(";")[2] || "",
        android: "https://github.com/princerudh/",
        ios: "https://github.com/princerudh/"
      };
    }
    let stickerBuffer = await addExif(q, exif);
    return await message.client.sendMessage(message.jid, { sticker: fs.readFileSync(stickerBuffer) }, { quoted: message.data });
  }
});

command({
    pattern: "photo",
    fromMe: isPrivate,
    desc: "Changes sticker to Photo",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message.sticker)
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(message.jid, buff, {}, "image");
  }
);

command({
    pattern: "mp3",
    fromMe: isPrivate,
    desc: "converts video/voice to mp3",
    type: "media",
}, async (message, match) => {
  try {
   let media = await toAudio(await message.quoted.download("buffer"));
    
    let matchParts = match ? match.match(/[^,;]+/g) : [];
    let configParts = config.AUDIO_DATA.match(/[^,;]+/g);
    
    let url = matchParts[2] ? matchParts[2] : (configParts[2] ? configParts[2] : '');
    let cover = await getBuffer(url); 

    let title = matchParts[0] ? matchParts[0] : (configParts[0] ? configParts[0] : config.AUDIO_DATA);
    let artist = matchParts[1] ? matchParts[1] : (configParts[1] ? configParts[1] : config.AUDIO_DATA);
    artist = [artist]; // Ensure artist is an array

    const res = await AddMp3Meta(media, cover, {
      title: title,
      artist: artist
    });

    return await message.client.sendMessage(message.jid, {
      audio: res,
      mimetype: "audio/mpeg"
    }, {
      quoted: message.data
    });
  } catch (error) {
    console.error("Error:", error);
    return await message.send("An error occurred while processing your request.");
  }
});

command({
    pattern: "mp4",
    fromMe: isPrivate,
    desc: "converts video/voice to mp4",
    type: "media",
  },
  async (message, match, m) => {
    if (
      !message.reply_message.video ||
      !message.reply_message.sticker ||
      !message.reply_message.audio
    )
      return await message.reply("_Reply to a sticker/audio/video_");
    let buff = await m.quoted.download();
    if (message.reply_message.sticker) {
      buff = await webp2mp4(buff);
    } else {
      buff = await toAudio(buff, "mp4");
    }
    return await message.sendMessage(
      message.jid,
      buff,
      { mimetype: "video/mp4" },
      "video"
    );
  }
);

command({
    pattern: "img",
    fromMe: isPrivate,
    desc: "Converts Sticker to image",
    type: "media",
  },
  async (message, match, m) => {
    if (!message.reply_message.sticker)
      return await message.reply("_Reply to a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(message.jid, buff, {}, "image");
  }
);
