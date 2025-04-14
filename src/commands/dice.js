import { SlashCommandBuilder } from "discord.js";
import { DiceRoll, exportFormats } from "@dice-roller/rpg-dice-roller";

export default {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Dice related commands")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("roll")
        .setDescription("Roll dice using a notation (e.g., 4d6 or 2d10+1d4)")
        .addStringOption((option) =>
          option
            .setName("notation")
            .setDescription("Enter dice notation")
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("help").setDescription("Get help with dice notation"),
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "help") {
      const helpEmbed = {
        color: 0xbcc993,
        title: "Dice Notation Help",
        url: "https://dice-roller.github.io/documentation/guide/notation/",
        description:
          'Use notations such as "4d6" or "2d10+1d4" to roll dice. This notation lets you specify dice types, quantities, and modifiers. Visit the URL for details.',
        fields: [
          {
            name: "Dice Types",
            value: "E.g., d6, d20",
            inline: true,
          },
          {
            name: "Modifiers",
            value: "E.g., exploding dice, re-rolls",
            inline: true,
          },
          {
            name: "Grouping & Maths",
            value: "Combine multiple dice and apply mathematical operations",
            inline: true,
          },
        ],
      };
      await interaction.reply({ embeds: [helpEmbed] });
    } else if (interaction.options.getSubcommand() === "roll") {
      const notation = interaction.options.getString("notation");
      try {
        const roll = new DiceRoll(notation).export(exportFormats.OBJECT);
        const rollsMatch = roll.output.match(/(?<=: )(.+?)\s*(?= =)/);
        const rollsText = rollsMatch ? rollsMatch[0] : "N/A";
        const rollEmbed = {
          color: 0xbcc993,
          title: `${roll.notation}  ⇒  ${roll.total}`,
          description: `Roll result: \`${rollsText}\``,
          fields: [
            {
              name: "Average Total",
              value: `${roll.averageTotal}`,
              inline: true,
            },
            {
              name: "Max Total",
              value: `${roll.maxTotal}`,
              inline: true,
            },
            {
              name: "Min Total",
              value: `${roll.minTotal}`,
              inline: true,
            },
          ],
        };
        await interaction.reply({ embeds: [rollEmbed] });
      } catch (error) {
        await interaction.reply({
          content: `Error: ${error.message}`,
          ephemeral: true,
        });
      }
    }
  },
};
