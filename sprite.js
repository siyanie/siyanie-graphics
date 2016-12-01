const glob = require('glob')
const cheerio = require('cheerio')
const { readFileSync, writeFile } = require('fs')

const cheerioOptions = {
	xmlMode: true
}

const sprite = cheerio.load('<svg><defs></defs></svg>', cheerioOptions)

glob('build/icons/*.svg', (err, paths) => {
	paths.forEach(path => {
		const data = readFileSync(path)
		const icon = cheerio.load(data, cheerioOptions)

		if (/\.clip.svg$/.test(path)) {
			icon('svg')[0].name = 'clipPath'
			sprite('defs').append(icon.html())
		} else {
			icon('svg')[0].name = 'symbol'
			sprite('svg').append(icon.html())
		}

	})
	writeFile(
		'build/sprite.svg',
		sprite.html().replace(/>\s+</gm, '><')
	)
})
