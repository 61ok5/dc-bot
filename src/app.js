import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

// Setup __dirname for ES modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function startApp() {
  // Create a new client instance with both guild and DM intents.
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ],
    // Required for receiving DMs.
    partials: ["CHANNEL"],
  });

  // Prepare a collection for commands.
  client.commands = new Collection();

  // Load command modules dynamically from src/commands.
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commandModule = await import(`file://${filePath}`);
    const command = commandModule.default;
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
    } else {
      console.warn(
        `WARNING: The command at ${filePath} is missing a required "data" or "execute" export.`,
      );
    }
  }

  // Load event modules dynamically from src/events.
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const eventModule = await import(`file://${filePath}`);
    const event = eventModule.default;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }

  // Global error handling.
  process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
  });
  process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:", error);
  });

  // Login to Discord.
  client.login(process.env.TOKEN);
}
