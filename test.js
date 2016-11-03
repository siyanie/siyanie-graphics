import test from 'ava'
import { exec } from 'child_process'
import { stat } from 'fs'

const stats = (path) =>
	new Promise((resolve, reject) => {
		stat(path, (err, stat) => {
			if (err) reject(err)
			else resolve(stat)
		})
	})
const tasks = [
	{
		name: 'svg',
		output:
		[
			'build/sprite.svg'
		]
	},
	{
		name: 'site:template',
		output:
		[
			'docs/index.html'
		]
	},
	{
		name: 'site:scripts',
		output:
		[
			'docs/script.js'
		]
	}
]
const run = (task) =>
	new Promise((resolve, reject) => {
		exec(task, (err, stdout, stderr) => {
			if (err) reject(err)
			else if (stderr) reject(stdout)
			else resolve(stdout)
		})
	})

tasks.forEach(({ name, output }) => {
	test(
		`${name} task`,
		t => run(`npm run ${name}`)
			.then(() => {
				return Promise
					.all(output.map(path => stats(path)))
					.then(() => t.pass())
					.catch(err => {
						console.error(`No ${err}`)
						t.fail()
					})
			})
			.catch(err => t.fail(`Err: ${err}`))
	)
})
