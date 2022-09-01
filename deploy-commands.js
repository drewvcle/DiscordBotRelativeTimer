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
    .setName("auc1")
    .setDescription("Resets Auction #1 time."),
  new SlashCommandBuilder()
    .setName("auc2")
    .setDescription("Resets Auction #2 time."),
  new SlashCommandBuilder()
    .setName("auc3")
    .setDescription("Resets Auction #3 time"),
  new SlashCommandBuilder()
    .setName("auc4")
    .setDescription("Resets Auction #4 time"),
  new SlashCommandBuilder()
    .setName("auc5")
    .setDescription("Resets Auction #5 time"),
  new SlashCommandBuilder()
    .setName("auc6")
    .setDescription("Resets Auction #6 time"),
  new SlashCommandBuilder()
    .setName("auc7")
    .setDescription("Resets Auction #7 time"),
  new SlashCommandBuilder()
    .setName("auc8")
    .setDescription("Resets Auction #8 time"),
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
