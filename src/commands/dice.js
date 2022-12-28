const { DiceRoll } = require('@dice-roller/rpg-dice-roller');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
                .setName('dice')
                .setDescription('Rolling a dice with specified notation')
		.addStringOption(option =>
			option.setName('notation')
			.setDescription('Sth like 4d6, 2d10 + 1d4 or 8dF.2 - 3')
			.setRequired(true)),
        async execute(interaction) {
		const notation = interaction.options.getString('notation').replace(/\s+/g, '')
		// const regex = /(\d+)?d(\d+|F(\.\d)?)((?:\+|-)(\d+))?/gi;
		// const match = notation.match(regex)
    		// if (!match) {
		// 	await interaction.reply('Please input valid notation')
		// 	return
		// }
		try {
	        	const roll = new DiceRoll(notation);
		       	await interaction.reply(`${roll}`);
		} catch (error) {
			await interaction.reply(`Given notation **${notation}** and error found:\n`+error.message)
		}
	},
};

