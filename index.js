const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { userMention, memberNicknameMention, channelMention, roleMention } = require('discord.js');
// const id = '123456789012345678';
// const user = userMention(id);
// const nickname = memberNicknameMention(id);
// const channel = channelMention(id);
// const role = roleMention(id);

const { time } = require('discord.js');
const date1 = new Date();
const date2 = new Date();
const date3 = new Date();
var relative1 = time(date1, 'R');
var relative2 = time(date2, 'R');
var relative3 = time(date3, 'R');
//const relative1 = time(date, 'R');
// const timeString = time(date);

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
	} else if (commandName === 'test1') {
    await interaction.reply(`Channel 1: <#${interaction.channel.id}>`);
  } else if (commandName === 'timetest') {
    await interaction.reply(timeString);
  } else if (commandName === 'auc1') {
    const date1 = new Date();
    relative1 = time(date1, 'R');
    await interaction.reply(relative1);
  } else if (commandName === 'auc2') {
    const date2 = new Date();
    relative2 = time(date2, 'R');
    await interaction.reply(relative2);
  } else if (commandName === 'auc3') {
    const date3 = new Date();
    relative3 = time(date3, 'R');
    await interaction.reply(relative3);
  } else if (commandName === 'timers'){
    await interaction.reply(`${channelMention('1013859742210342982')}: started ` + relative1 + `.
${channelMention('1013859762284265513')}: started` + relative2 + `.
${channelMention('1013859785365524552')}: started ` + relative3 + `.`);
  }
});



client.login(client.config.token);






