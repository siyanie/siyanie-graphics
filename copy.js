const glob = require('glob')
const { parse } = require('path')
const { createReadStream, createWriteStream } = require('fs')

glob('src/icons/*.png', (err, paths) => {
	paths.forEach(path => {
		const { base } = parse(path)

		createReadStream(path)
			.pipe(createWriteStream(`docs/icons/${base}`))
	})
})
