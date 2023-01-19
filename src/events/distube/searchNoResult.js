const status = require('./status.js')

module.exports = {
        name: 'searchNoResult',
        async execute(message, query) =>
    		message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
};
