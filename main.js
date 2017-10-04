const PlugAPI = require('plugapi');
const youtubedl = require('youtube-dl');
const omx = require('node-omxplayer');

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
    media = bot.getMedia();
    if (!media)
    {
	console.log('pas de media. Je ne sais pas quoi faire. Je panique.');
	console.log('segmentation fault - core dumped');
	process.exit();
    }
    cid = media.cid;
    var video = youtubedl(cid, ['-f mp4'], {cwd: __dirname});
    video.on('info', function(info) {
	console.log('video started : ' + JSON.stringify(info, null, 4));
	stream(info.url);
    });
}

stream = function(url)
{
    var player = omx(url);
    player.on('error', function(error) {
	console.log('error :' + error);
    });
    player.on('close', function() {
	console.log('closed !');
    });
    console.log('coucou');
}
