const status = require('./status.js')

module.exports = {
        name: 'addSong',
        async execute(queue, song) =>
		queue.textChannel.send(
 		     `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    		)
};
