const glob = require('glob')
const cheerio = require('cheerio')
const { parse } = require('path')
const { readFile, writeFile } = require('fs')

glob('build/icons/*.svg', (err, paths) => {
	paths.forEach(path => {
		readFile(path, (err, data) => {
			const $ = cheerio.load(data)
			const svg = $('svg')
			const { name } = parse(path)

			svg
				.attr('id', `icon--${name}`)
				.attr('class', `icon icon--${name}`)
				.removeAttr('xmlns')

			writeFile(path, $.html(), () => {
				console.log(`Done ${path}`)
			})
		})
	})
})
