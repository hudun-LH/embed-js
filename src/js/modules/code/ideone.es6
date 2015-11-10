let Base = require('../base.es6');

class Ideone extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = /ideone.com\/[a-zA-Z0-9]{6}/gi;
		this.service = 'ideone';
	}

	template(match){
		let template =
		`<div class="ejs-ideone ejs-embed">
			<iframe src="http://ideone.com/embed/${match.split('/')}" frameborder="0" height="${this.options.codeEmbedHeight}"></iframe>',
		</div>`;
		return template;
	}
}

module.exports = Ideone;