const spawn = require('child_process').spawn;
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
    main();
});
bot.on(PlugAPI.events.CHAT, (data) => {
    console.log(`${data.from} said ${data.message}`);
});

function main()
{
    bot.sendChat('Coucou, je suis le bot de td8 !');
    catchCurrentVideo(bot);
}

function catchCurrentVideo(bot)
{
    var timeElapsed = bot.getTimeElapsed();
    var cid = bot.getMedia().cid;
    
    console.log('video current time : ' + timeElapsed);
    readVideo(bot, cid, timeElapsed);
}

function readVideo(bot,cid,time=0)
{
    console.log('read ' + cid);
    var video = youtubedl(cid, ['-f mp4'], {cwd: __dirname});
    video.on('info', function(info) {
	console.log('video started : ' + cid);

	if (time != 0)
	{
	    stream(bot, info.url, bot.getTimeElapsed());
	}
    });
}

function stream(bot,url, time=0)
{
    console.log('stream ' + bot.getMedia());
    let omxProcess = spawn('omxplayer', ['-l '+ time, url]);
    omxProcess.on('close', function() {
	console.log('player closed');
    });
}
