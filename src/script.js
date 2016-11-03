const Clipboard = require('clipboard')
const clipboard = new Clipboard('.icn', {
	target (trigger) {
		return trigger.querySelector('.icn__name')
	}
})
const className = '_copied'
const timeout = 1000

clipboard.on('success', e => {
	e.trigger.classList.add(className)
	setTimeout(() => {
		e.trigger.classList.remove(className)
	}, timeout)

	e.clearSelection()
})

clipboard.on('error', e => {
	console.error('Action:', e.action)
	console.error('Trigger:', e.trigger)
})
