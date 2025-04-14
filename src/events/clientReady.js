import { Events, REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // Prepare global slash command data.
    const commandsData = Array.from(client.commands.values()).map((cmd) =>
      cmd.data.toJSON(),
    );
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    try {
      // Global registration (available in all guilds the bot is added to).
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: commandsData,
      });
      console.log(
        `Successfully registered ${commandsData.length} global slash commands.`,
      );
    } catch (error) {
      console.error("Error registering global slash commands:", error);
    }
  },
};
