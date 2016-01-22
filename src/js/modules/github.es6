import { ifInline } from './utils.es6'
import { inlineEmbed, normalEmbed } from './helper.es6'


export default class Github {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.service = 'github';
		this.regex   = /github.com\/([a-zA-Z0-9\.-]+)\/([a-zA-Z0-9\.-]+)/gi;
	}

	static fetchRepo(data) {
		let api = `https://api.github.com/repos/${data.user}/${data.repo}`;
		return new Promise((resolve) => {
			fetch(api)
				.then(function (data) {
					return data.json()
				})
				.then(function (json) {
					return resolve(json)
				})
		})
	}

	static template(data, options) {
		return options.template.github(data, options);
	}

	static urlToText(_this, match, url, normalEmbed) {
		let data = !normalEmbed ? ({
			user: match[2],
			repo: match[3]
		}) : ({
			user: match[1],
			repo: match[2]
		});

		if (!data.repo) return;
		return new Promise(function (resolve) {
			Github.fetchRepo(data)
				.then(function (response) {
					return resolve(Github.template(response, _this.options))
				})
		})
	}

	process() {
		return new Promise((resolve) => {
			if (!ifInline(this.options, this.service)) {
				inlineEmbed(this, Github.urlToText)
					.then((response) => {
						resolve([response, this.embeds])
					})
			} else {
				normalEmbed(this, Github.urlToText)
					.then((embeds) => {
						resolve([this.output, embeds])
					})
			}
		})
	}
}
