const { parse } = require('path')
const glob = require('glob')
const cheerio = require('cheerio')
const { readFile, writeFile } = require('fs')

const tml = (preview, name) =>
`<div class="icn">
	<div class="icn__preview">${preview}</div>
	<div class="icn__name">${name}</div>
</div>`

const getIcon = (path) => {
	return new Promise(resolve => {
		readFile(path, (err, data) => {
			const preview = data.toString()
			let { name } = parse(path)

			if (/\.clip$/.test(name))
				name = name.replace(/\.clip$/, '')

			resolve(tml(preview, name))
		})
	})
}

readFile('src/index.html', (err, file) => {
	if (!err) {
		const $ = cheerio.load(file)


		glob('build/icons/*.svg', (err, paths) => {
			Promise.all(
					paths.map(getIcon)
				)
				.then(icons => {
					$('.icns').append(icons.join(''))
					writeFile('docs/index.html', $.html(), () => {
						console.log('Done!')
					})
				})
		})
	}
})
