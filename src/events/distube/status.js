module.exports = status = queue =>
	`Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
		queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
