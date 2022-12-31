const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
                .setName('server')
                .setDescription('Server commands')
                .addSubcommand(subcommand =>
                        subcommand
                        .setName('info')
                        .setDescription('Return server info')),
        async execute(interaction) {
                if(interaction.options.getSubcommand() == 'info') {
                        const guild = await interaction.guild.fetch()
			const channelCount = guild.channels.cache.reduce((p, c) => {
				switch (c.type) {
    					case 0:
      						p[0]++
      						break;
    					case 2:
      						p[1]++
      						break;
    					case 4:
      						break;
    					default:
      						p[2]++
      						break;
				}
  				return p
			},[0,0,0])
                        const featuresField = guild.features.length > 0 ? guild.features.join(', ') : 'None';
                        const helpEmbed = new EmbedBuilder()
                                .setColor(0xbcc993)
                                .setTitle(`${guild.name}`)
                                .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
                                .setDescription(`${guild.description}`)
                                .setThumbnail(`${guild.iconURL({ dynamic: true })}` )
                                .addFields(
                                    { name: '\u200B', value: '\u200B' },
                                    { name: 'Server ID', value: `${guild.id}`, inline: false },
				    { name: '\u200B', value: '\u200B' },
				    { name: 'Region / Language', value: `${guild.region || interaction.guildLocale}`, inline: true },
    				    { name: '\u200B', value: '\u200B', inline: true },
				    { name: 'Server Boost', value: `${guild.premiumTier}`, inline: true },
				    { name: 'Owner', value: `<@!${guild.ownerId}>`, inline: true },
				    { name: '\u200B', value: '\u200B', inline: true },
				    { name: 'Created At', value: `${guild.createdAt.toDateString()}`, inline: true },
				    { name: '\u200B', value: '\u200B' },
				    { name: 'Member Count', value: `${guild.memberCount}\n(${guild.approximatePresenceCount} online, ${interaction.guild.members.cache.filter(member => member.user.bot).size} bots)`, inline: true },
    				    { name: '\u200B', value: '\u200B', inline: true },
				    { name: 'Channel Count', value: `Text: ${channelCount[0]}\nVoice: ${channelCount[1]}\nOthers: ${channelCount[2]}`, inline: true },
                                    { name: 'Role Count', value: `${guild.roles.cache.size}`, inline: true },
    				    { name: '\u200B', value: '\u200B', inline: true },
				    { name: 'Emoji Count', value: `${guild.emojis.cache.size}`, inline: true },
                                    { name: 'Features', value: `\`${featuresField}\``, inline: false },
				    { name: '\u200B', value: '\u200B' }
				)
                                // .setImage(`${guild.iconURL({ dynamic: true })}` )
                                .setTimestamp()
                                .setFooter({ text: `${interaction.commandName} ${interaction.options.getSubcommand()}`, iconURL: guild.iconURL({ dynamic: true }) });

                        await interaction.reply({ embeds: [helpEmbed] });
                }
        },
};
