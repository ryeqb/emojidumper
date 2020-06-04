# Emojidumper

An emoji dumper for Discord written in Javascript.
-The old repository has been deleted due to a mishap while pushing changes-

## Requirements and dependencies

Install the latest version of [Node.js](https://nodejs.org/en/download/) to use this project
```bash
Other dependencies:
npm install discord.js (Confirmed to be working on v11.4.2, may fail on newer versions due to countermeasures against selfbot usage)
npm install request
npm install readline-sync
```

## Attention

This project is designed to operate via a regular Discord account's authentication token. Using so-called selfbots is in violation of Discord's Terms of Service and may result in the closure of your account. You may however use this on a regular bot account!

I am not responsible for any losses that may occur during the use of this project.

## Usage

![Cli usage](https://up.ryeqb.xyz/yq0nj.gif)

```bash
[1] Obtain your authentication token (Ctrl + Shift + I to open the devtool > Networking > Search for "/api" and check the authentication header)
[2] Edit settings.json and insert the token you just obtained.
[3] Run start.bat
[4] Paste the respective server ID into the command-line interface and press enter
[4] Profit
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
