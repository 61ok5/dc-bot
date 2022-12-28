const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.bot) return;
		try {
			if(message.content.toLowerCase().includes('melon'))
				await message.channel.send('Hi, I\'m Melon')
		} catch (error) {
			console.error(`Error executing MessageCreate`);
			console.error(error);
		}
	},
};
