const { ChatGPTAPIBrowser } = require('chatgpt');
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
        data: new SlashCommandBuilder()
                .setName('chatgpt')
                .setDescription('ChatGPT')
		    .addStringOption(option =>
                	    option.setName('question')
                	    .setDescription('Ask sth')
                 	    .setRequired(true)),
        async execute(interaction) {
                        try {
				const question = interaction.options.getString('question')
                                const api = new ChatGPTAPIBrowser({
					email: process.env.OPENAI_EMAIL,
					password: process.env.OPENAI_PASSWORD
				})
				await api.initSession()

				const result = await api.sendMessage(question)
				console.log(result.response)
				const chatGPTEmbed = {
                                        color: 0xbcc993,
                                        title: `**${question}**`,
                                        description: `result.response`,
                                };
                                await interaction.reply({ embeds: [chatGPTEmbed] });
                        } catch (error) {
                                await interaction.reply(error.message)
                        }
        }
};
