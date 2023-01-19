const status = require('./status.js')

module.exports = {
        name: 'finish',
        async execute(queue) =>
		queue.textChannel.send('Finished!')
};
