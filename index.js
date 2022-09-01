const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { userMention, memberNicknameMention, channelMention, roleMention } = require('discord.js');
const { time } = require('discord.js');

// Get the difference between two relative times
function compareTime (s1, s2){
  var diff;
  s1 = parseInt(s1.substring(3,13));
  s2 = parseInt(s2.substring(3,13));
  return (s2 - s1);
}

// Constants for auction channels
var numAucs = 8;
const channelIDs = ['1013859742210342982', '1013859762284265513', '1013859785365524552', '1015016976978018325', '1015016994552164432', '1015017007390933113', '1015017021592834139', '1015017038852390952'];
const dates = [];
var relatives = [];
for (let i = 0; i < numAucs; i++){
  dates[i] = new Date();
  relatives[i] = time(dates[i], 'R');
}

// Discord stuff
const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});



client.config = require("./config.json");

client.on('interactionCreate', async interaction => {

	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

  if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: <@${interaction.user.id}>`);
	// } else if (commandName === 'test1') {
  //   await interaction.reply(`Channel 1: <#${interaction.channel.id}>`);
  // } else if (commandName === 'timetest') {
  //   await interaction.reply(timeString);

  // Resets the auction cooldown. Ex. /auc1 would reset the cooldown for Auction #1
  } else if (commandName.substring(0,3) === 'auc') {
      let aucnum = parseInt(commandName.substring(3,4));
      dates[aucnum] = new Date();
      relatives[aucnum] = time(dates[aucnum], 'R');
      await interaction.reply(relatives[aucnum]);

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

    await interaction.reply(messageTimes);
  }
});

client.login(client.config.token);




