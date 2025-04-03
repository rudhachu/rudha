const { command, isPrivate } = require("../lib/");

command({
    pattern: "ping",
    fromMe: isPrivate,
    desc: "check bot speed",
    type: "user",
  },
    async (message) => {
	const start = new Date().getTime();
	const msg = await message.reply('*Checking*');
	const end = new Date().getTime();
	const responseTime = end - start;
	await msg.edit(`*Response: ${responseTime} secs*`);
});
