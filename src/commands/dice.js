const { DiceRoll, exportFormats } = require('@dice-roller/rpg-dice-roller');
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
	    	if(interaction.options.getSubcommand() == 'help') {
			const helpEmbed = {
				color: 0xbcc993,
				title: 'What are notations? | RPG Dice Roller',
				url: 'https://dice-roller.github.io/documentation/guide/notation/',
				description: 'Dice can be rolled through the use of \"notations\". A notation is a simple string of characters that tells the parser which dice and modifiers to roll.\n\nThe format of the notation is based on the Wikipedia article Dice Notation, so it\'s consistent and conforms to a standard of sorts, albeit a very loose one.\n\nIt\'s then been enhanced to bring in extra functionality, that is not otherwise possible with the basic notation.',
				fields: [
				    {
					name: '\u200b',
					value: '\u200b',
					inline: false,
				    },
				    {
					name: 'Dice',
					value: 'The different types of dice that can be rolled (e.g. d6, d20, d%, dF).',
					inline: true,
		    		    },
		   		    {
					name: 'Modifiers',
					value: 'The modifiers that can affect dice rolls (e.g. "exploding", "re-roll").',
					inline: true,
				    },
				    {
					name: '\u200b',
					value: '\u200b',
					inline: false,
				    },
				    {
					name: 'Group rolls',
					value: 'Perform actions and modifiers on collections of rolls.',
					inline: true,
				    },
				    {
					name: 'Roll descriptions',
					value: 'Describing or labeling a roll.',
					inline: true,
				    },
				    {
					name: 'Maths',
					value: 'Generic mathematical equations.',
					inline: true,
				    },
				],
			};
			await interaction.reply({ embeds: [helpEmbed] });
		}
		else if(interaction.options.getSubcommand() == 'roll') {
			const notation = interaction.options.getString('notation')
			try {
				const roll = new DiceRoll(notation).export(exportFormats.OBJECT);
				const rolls = roll.output.match(/(?<=: )(.+?)\s*(?= \=)/)[0]
				const rollEmbed = {
					color: 0xbcc993,
					title: `**${roll.notation}    =>    ${roll.total}**`,
					description: `Your roll gives\n\`${rolls}\``,
					fields: [
					    {
						name: 'Average Total',
						value: `${roll.averageTotal}`,
						inline: true,
					    },
					    {
						name: 'Max Total',
						value: `${roll.maxTotal}`,
						inline: true,
					    },
					    {
						name: 'Min Total',
						value: `${roll.minTotal}`,
						inline: true,
					    },
					],
				};
				await interaction.reply({ embeds: [rollEmbed] });
			} catch (error) {
				await interaction.reply(`Given notation **${notation}** and error found:\n`+error.message)
			}
		}
	},
};
