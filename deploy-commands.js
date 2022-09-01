const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { clientId, guildId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
  new SlashCommandBuilder()
    .setName("test1")
    .setDescription("This is test1"),
  new SlashCommandBuilder()
    .setName("timetest")
    .setDescription("Testing time"),
  new SlashCommandBuilder()
    .setName("auc1")
    .setDescription("Resets Auction #1 time."),
  new SlashCommandBuilder()
    .setName("auc2")
    .setDescription("Resets Auction #2 time."),
  new SlashCommandBuilder()
    .setName("auc3")
    .setDescription("Resets Auction #3 time"),
  new SlashCommandBuilder()
    .setName("timers")
    .setDescription("Provides a list of all auction timers."),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);

  // when you are done, type "node deploy-commands.js" in terminal