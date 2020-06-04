const Discord = require("discord.js");
const fs = require('fs');
const rl = require("readline-sync");
const request = require("request");
const client = new Discord.Client();
const Helper = require("./utils.js");
const util = new Helper();

function main(client){
	util.log( "[?] Which server id would you like to dump?...", "yellow" );
	let input = rl.prompt();

	if( input == "0" ) {
		return process.exit();
	}
	try {
		util.dump( client, input, () => {
			main( client );
		} );
	}
	catch( err ) {
		console.error( err );
		util.log( "[:/] The server ID you entered isn't valid! Please try again...", "red" );
		main( client );
	}
	return;
}

function init(client){
	util.log( "[!] Thank you for using this emoji dumper!", "green" );

	if(!fs.existsSync("./settings.json")){
		util.log( "[!] Seems as though you are missing a settings file...", "yellow" );
		util.log( "[!] Please enter your Discord token to proceed...", "yellow" );
		let token = rl.prompt();

		let json = {
			"client": {
				"token": `${ token }`
			}
		}

		fs.appendFile( "./settings.json", JSON.stringify( json, null, "\t" ), ( err ) => {
			if( err )
				console.error( err );

			util.log( "[!] Settings successfully saved!\n\n", "green" );

			let data = JSON.parse( fs.readFileSync( "./settings.json", { encoding: "utf8" } ) );
			client.login( data.client.token );
		});

		return;
	}

	let data = JSON.parse( fs.readFileSync( "./settings.json", {encoding: "utf8"} ) );
	client.login( data.client.token );
}

init( client );

client.on( 'ready', () => {
	util.log( `[!] Connected to gateway, logged in as ${client.user.username}!`, "green" );
	util.log( "[!] Welcome to emojidumper!  [  Enter 0 to exit!  ]", "green" );

	main( client );
} );