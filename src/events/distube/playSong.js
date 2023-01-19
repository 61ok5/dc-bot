const status = require('./status.js')

module.exports = {
        name: 'playSong',
        async execute(queue, song) =>
    		queue.textChannel.send(
      			`${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${
        			song.user
      			}\n${status(queue)}`
    		)
};
