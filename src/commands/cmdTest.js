const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
		.setDescription('Reply'),
	async execute(interaction) {
		await interaction.reply('Hi');
	},
};
