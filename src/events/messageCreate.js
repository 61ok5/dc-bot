import { Events } from "discord.js";

export default {
  name: Events.MessageCreate,
  async execute(message) {
    // Ignore messages from bots.
    if (message.author.bot) return;

    try {
      if (message.content.toLowerCase().includes("melon")) {
        await message.channel.send("Hi, I'm Melon");
      }
    } catch (error) {
      console.error("Error in messageCreate event:", error);
    }
  },
};
