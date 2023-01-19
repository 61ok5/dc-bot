const status = require('./status.js')

module.exports = {
        name: 'addList',
        async execute(queue, playList) =>
		queue.textChannel.send(
		      `${client.emotes.success} | Added \`${playlist.name}\` playlist (${
		        playlist.songs.length
	      		} songs) to queue\n${status(queue)}`
	    	)
};
