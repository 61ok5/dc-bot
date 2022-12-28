const { DiceRoll } = require('@dice-roller/rpg-dice-roller');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
                .setName('dice')
                .setDescription('Rolling a dice with specified notation')
		.addSubcommand(subcommand =>
			subcommand
			.setName('roll')
			.setDescription('Sth like 4d6, 2d10 + 1d4 or 8dF.2 - 3')
			.addStringOption(option =>
				option.setName('notation')
				.setDescription('Sth like 4d6, 2d10 + 1d4 or 8dF.2 - 3')
				.setRequired(true)))
	     	.addSubcommand(subcommand =>
			subcommand
			.setName('help')
			.setDescription('Get some help')),
        async execute(interaction) {
	    	if(interaction.options.getSubcommand() == 'help')
			await interaction.reply('Please check:\nhttps://dice-roller.github.io/documentation/guide/notation/');
		else if(interaction.options.getSubcommand() == 'roll') {
			const notation = interaction.options.getString('notation').replace(/\s+/g, '')
			try {
				const roll = new DiceRoll(notation);
				await interaction.reply(`${roll}`);
			} catch (error) {
				await interaction.reply(`Given notation **${notation}** and error found:\n`+error.message)
			}
		}
	},
};
