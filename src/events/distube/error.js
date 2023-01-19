const status = require('./status.js')

module.exports = {
        name: 'error',
        async execute(channel, e) =>
		if (channel) channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
    		else console.error(e)
};
