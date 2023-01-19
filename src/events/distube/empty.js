const status = require('./status.js')

module.exports = {
        name: 'empty',
        async execute(channel) =>
		channel.send('Voice channel is empty! Leaving the channel...'))
};
