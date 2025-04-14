import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("hi")
    .setDescription("Replies with a greeting"),
  async execute(interaction) {
    await interaction.reply("Hi");
  },
};
