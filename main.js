const PlugAPI = require('plugapi');
const bot = new PlugAPI({
	email: process.env.PLUG_EMAIL,
	password: process.env.PLUG_PASSWORD
});

bot.connect('survival-machines'); // The part after https://plug.dj

bot.on(PlugAPI.events.ROOM_JOIN, (room) => {
	console.log(`Joined ${room}`);
	moteur();
});
bot.on(PlugAPI.events.CHAT, (data) => {
	console.log(`${data.from} said ${data.message}`);
});

moteur = function() {
	bot.sendChat('Coucou, je suis le bot de td8 !');
	console.log(bot.getMedia());
}
