const Discord = require("discord.js");
const fs = require('fs');
const rl = require("readline-sync");
const request = require("request");
const settings = require("./settings.json");
const client = new Discord.Client();

function sanitize(string) {
	const illegalChars = ['\\', '/', ':', '*', '?', '"', '<', '>', '|'];

	for(let i = 0; i < string.length; i++) {
		if(illegalChars.includes(string.charAt(i)))
			string = string.replace(string.charAt(i), '-');
	}
	return string;
}

function download(uri, filename, callback) {
  	request.head(uri, function(err, res, body){
    	request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  	});
  	return;
};

function dump(client, inputID) {
	const root = `./dumps`;
	let time = Date.now();
	let guild = client.guilds.find(guild => guild.id === inputID);
	let status = 0;

	if(!guild) return console.log("[X] Dumping a server requires you to be a member thereof!");
	let emojis = guild.emojis.array();

	if(!fs.existsSync(root)) fs.mkdirSync(root);

	console.log("[!] Creating dump directory. . .");
	fs.mkdirSync(`${root}/${sanitize(guild.name)}_dump_${time}`);
	console.log(`[+] Downloading ${emojis.length} emojis. . .`);

	for(let i = 0; i < emojis.length; i++) {
		let name = emojis[i].identifier.split(":")[0];
		let ext = emojis[i].animated ? "gif" : "png";
			
		download(emojis[i].url, `${`${root}/${sanitize(guild.name)}_dump_${time}`}/${name}.${ext}`, () => {
			console.log(`[+] Downloaded emoji ${name} (saved as .${ext})!`);
			++status;

			if(status >= emojis.length) {
				status = 0;
				console.log(`[!] Finished dumping guild->${inputID}!\n\n`);
				main(client);
			}
		});
	}
}

function main(client){
	console.log("Which server id would you like to dump?...");
	let input = rl.prompt();

	if(input == "0") {
		return process.exit();
	}
	try {
		dump(client, input);
	}
	catch(err) {
		console.error(err);
	}

	return;
}

client.on('ready', () => {
	console.log(`[!] Connected to gateway, logged in as ${client.user.username}!`);
	console.log("[!] Welcome to emojidumper!  [  Enter 0 to exit!  ]");

	main(client);
});

client.login(settings.client.token);