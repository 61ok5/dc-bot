import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Server related commands")
    .addSubcommand((subcommand) =>
      subcommand.setName("info").setDescription("Return server info"),
    ),

  async execute(interaction) {
    if (!interaction.inGuild()) {
      return await interaction.reply({
        content: "This command can only be run in a server.",
        ephemeral: true,
      });
    }

    let guild;
    try {
      guild = await interaction.client.guilds.fetch(interaction.guild.id);
    } catch (error) {
      return await interaction.reply({
        content: "Could not fetch the guild.",
        ephemeral: true,
      });
    }

    const iconURL = guild.iconURL({ dynamic: true });
    const validIcon = iconURL && iconURL !== "null" ? iconURL : undefined;

    const channelCount = guild.channels.cache.reduce(
      (p, c) => {
        switch (c.type) {
          case 0: // GuildText
            p[0]++;
            break;
          case 2: // GuildVoice
            p[1]++;
            break;
          case 4: // GuildCategory
            break;
          default:
            p[2]++;
            break;
        }
        return p;
      },
      [0, 0, 0],
    );

    const featuresField =
      guild.features.length > 0 ? guild.features.join(", ") : "None";

    const helpEmbed = new EmbedBuilder()
      .setColor(0xbcc993)
      .setTitle(`${guild.name}`)
      .setAuthor({
        name: `${guild.name}`,
        iconURL: validIcon,
      })
      .setDescription(`${guild.description}`)
      .setThumbnail(validIcon)
      .addFields(
        { name: "\u200B", value: "\u200B" },
        { name: "Server ID", value: `${guild.id}`, inline: false },
        { name: "\u200B", value: "\u200B" },
        {
          name: "Region / Language",
          value: `${guild.region || interaction.guildLocale}`,
          inline: true,
        },
        { name: "\u200B", value: "\u200B", inline: true },
        {
          name: "Server Boost",
          value: `Tier ${guild.premiumTier}`,
          inline: true,
        },
        { name: "Owner", value: `<@!${guild.ownerId}>`, inline: true },
        { name: "\u200B", value: "\u200B", inline: true },
        {
          name: "Created At",
          value: `${guild.createdAt.toDateString()}`,
          inline: true,
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "Member Count",
          value: `Total: ${guild.memberCount}\nOnline: ${guild.approximatePresenceCount || "N/A"}\nBot: ${guild.members.cache.filter((m) => m.user.bot).size}`,
          inline: true,
        },
        { name: "\u200B", value: "\u200B", inline: true },
        {
          name: "Channel Count",
          value: `Text: ${channelCount[0]}\nVoice: ${channelCount[1]}\nOthers: ${channelCount[2]}`,
          inline: true,
        },
        {
          name: "Role Count",
          value: `${guild.roles.cache.size}`,
          inline: true,
        },
        { name: "\u200B", value: "\u200B", inline: true },
        {
          name: "Emoji Count",
          value: `${guild.emojis.cache.size}`,
          inline: true,
        },
        { name: "\u200B", value: "\u200B" },
        { name: "Features", value: `\`${featuresField}\``, inline: false },
        { name: "\u200B", value: "\u200B" },
      )
      .setTimestamp()
      .setFooter({
        text: `${interaction.commandName} ${interaction.options.getSubcommand()}`,
        iconURL: validIcon,
      });

    await interaction.reply({ embeds: [helpEmbed] });
  },
};
