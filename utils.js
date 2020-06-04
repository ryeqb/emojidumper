const fs = require("fs");
const request = require("request");

class Utils {
	constructor(){};

	log( content, color ) {
		const col = {
			red : "\x1b[31m%s\x1b[0m",
			green : "\x1b[32m%s\x1b[0m",
			yellow : "\x1b[33m%s\x1b[0m",
			blue : "\x1b[34m%s\x1b[0m",
			magenta : "\x1b[35m%s\x1b[0m",
			cyan : "\x1b[36m%s\x1b[0m"
		}

		let output = `[${ new Date().toLocaleString() }] ${ content }`;

		switch( color ) {
			case 'red':
				console.log( `${ col.red }`, `${ output }` );
				break;
			case 'green':
				console.log( `${ col.green }`, `${ output }` );
				break;
			case 'yellow':
				console.log( `${ col.yellow }`, `${ output }` );
				break;
			case 'blue':
				console.log( `${ col.blue }`, `${ output }` );
				break;
			case 'magenta':
				console.log( `${ col.magenta }`, `${ output }` );
				break;
			case 'cyan':
				console.log( `${ col.cyan }`, `${ output }` );
				break;
			default:
				console.log( `${ col.output }` );
				break;
		}
	}

	sanitize( string ) {
		const illegalChars = [ '\\', '/', ':', '*', '?', '"', '<', '>', '|' ];

		for( let i = 0; i < string.length; i++ ) {
			if( illegalChars.includes( string.charAt( i ) ) )
				string = string.replace( string.charAt( i ), '-' );
		}
		return string;
	}

	download( uri, filename, callback ) {
  		request.head( uri, function( err, res, body ){
    		request( uri ).pipe( fs.createWriteStream( filename ) ).on( 'close', callback );
  		});
  		return;
	};

	dump( client, inputID, _callback ) {
		const root = `./dumps`;
		let time = Date.now();
		let guild = client.guilds.find( guild => guild.id === inputID );
		let status = 0;

		if(!guild){
			this.log( "[:/] Something went wrong! Please try again...", "green" );
			return _callback();
		}
		let emojis = guild.emojis.array();

		if( !fs.existsSync( root ) ) fs.mkdirSync( root );

		this.log( "[!] Creating dump directory. . .", "green" );
		fs.mkdirSync( `${ root }/${ this.sanitize( guild.name ) }_dump_${ time }` );
		this.log( `[+] Downloading ${ emojis.length } emojis. . .`, "green" );

		for( let i = 0; i < emojis.length; i++ ) {
			let name = emojis[ i ].identifier.split( ":" )[ 0 ];
			let ext = emojis[ i ].animated ? "gif" : "png";
			
			this.download( emojis[ i ].url, `${`${ root }/${ this.sanitize( guild.name ) }_dump_${ time }`}/${ name }.${ ext }`, () => {
				this.log( `[+] Downloaded emoji ${ name } (saved as .${ ext })!`, "green" );
				++status;

				if( status >= emojis.length ) {
					status = 0;
					this.log( `[!] Finished dumping guild->${ inputID }!\n\n`, "green" );
					_callback();
				}
			} );
		}
	}
}

module.exports = Utils;