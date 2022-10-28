import { config } from 'dotenv';
config();
const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
import schedule from 'node-schedule';

//const { Client, GatewayIntentBits, Partials, Collection, CommandInteractionOptionResolver } = require("discord.js");
import { ChannelType, time, Client, GatewayIntentBits, Partials, Collection, CommandInteractionOptionResolver, userMention, channelMention, roleMention } from 'discord.js';
const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
//const { userMention, memberNicknameMention, channelMention, roleMention } = require('discord.js');
//const { time } = require('discord.js');
//const wait = require('node:timers/promises').setTimeout;
import { REST } from '@discordjs/rest';
import { channel } from 'node:diagnostics_channel';

const rest = new REST({ version: '10'}).setToken(TOKEN);
//IMPORTANT: when uploading to GitHub, FileSystem will likely not work. If it doesn't work, check https://github.com/nodejs/node/blob/main/doc/api/fs.md
//var fs = require('fs');
import * as fs from 'node:fs';

// var LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');

// Get the difference between two relative times
function compareTime (s1, s2){
  var diff;
  s1 = parseInt(s1.substring(3,13));
  s2 = parseInt(s2.substring(3,13));
  return (s2 - s1);
}

// Constants for auction channels
var numAucs = 8;


const channelIDs = ['979109147289198592', '892888360681631774', '899695733366722610', '892888408282759238', '899695825326841936', '962698128333611068', '1012527001040605194', '1012527044040593428'];
// Below is auction IDs for test server
//const channelIDs = ['1023050142342975519', '1023050154883952680', '1023050166724472872', '1023051241183531108', '1023051249630842890', '1023051258669580330', '1023051270354915389', '1023051284636508180'];
const dates = [];
var relatives = [];
var saves;

fs.readFile('saveRel.txt', 'utf8', (err,data) => {
  if (err){
    console.log(err);
  }
  else if (data.length === 0) {
    for (let i = 0; i < numAucs; i++){
      dates[i] = new Date();
      relatives[i] = time(dates[i], 'R');

      fs.appendFile('saveRel.txt', relatives[i] + " ", function (err) {
        if (err) throw err;
        console.log(`Saved!`);
      })
      saves = data;
    }
  }
  else {
    saves = data;

    for (let i = 0; i < numAucs; i++){
      relatives[i] = saves.substring(17 * i, 16 + (17 * i));
    }

    console.log(data);
  }
});

// Discord stuff
const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember],
});

//const { loadEvents } = require("./Handlers/eventHandler");
import { loadEvents } from './Handlers/eventHandler.js';

//client.config = require("./config.json");
//import 'config.json';

client.events = new Collection();
loadEvents(client);



client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

	const { commandName } = interaction;
  if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: <@${interaction.user.id}>`);

  //Resets the auction cooldown.
  } else if (commandName === 'auc'){
      const typeInt = interaction.options.getInteger('num');

      let aucnum = typeInt - 1;
      if (aucnum < 0)
        await interaction.reply({content: "Please type a number between 1-8.", ephemeral: true});

      else if (aucnum > -1 && aucnum < 8){
      dates[aucnum] = new Date();
      relatives[aucnum] = time(dates[aucnum], 'R');
      saves = '';
      for (let i = 0; i < numAucs; i++)
        saves += relatives[i] + ' ';
      
      fs.writeFile('saveRel.txt', saves, err => {
        if (err) {
          console.error(err);
        }
      });
      await interaction.reply({content: "Timer reset! Time: " + relatives[aucnum], ephemeral: true});
    } else if (aucnum > 7)
      await interaction.reply({content: "Please type a number between 1-8.", ephemeral: true});
  
 // Previews all auction timers. Ex. /timers
  } else if (commandName === 'timers'){
    const datenow = new Date();
    var dn = time(datenow);

    for (let i = 0; i < numAucs; i++){
      if(compareTime(relatives[i], dn) > 86400)
        relatives[i] = "DONE";
    }
    let messageTimes = "";
    for (let i = 0; i < numAucs; i++)
      messageTimes += `${channelMention(channelIDs[i])}: ` + relatives[i] + '.\n';

    await interaction.reply({content: messageTimes});
  } 
});

//client.login(client.config.token);
client.login(TOKEN);






// Ping handler after 24 hours...

//git init
// git add *
// git commit -m "some title"
// git branch -M main
// git remote add origin https://github.com/drewvcle/DiscBotHeroku.git
// git push -u origin main

//OR
// git add *
// git commit -m "some title"
// git push


//npm i node-schedule
//npm i discord.js @discordjs/rest
//npm i -D nodemon dotenv

