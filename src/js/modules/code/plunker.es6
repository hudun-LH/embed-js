let Base = require('../base.es6');

class Plunker extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex =  /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/gi;
		this.service = 'plunker'
	}

	template(match){
		let a=match.split('?')[0].split('/')
		const id = a[a.length-1]
		let template =
		`<div class="ejs-embed ejs-plunker">
            <iframe class="ne-plunker" src="http://embed.plnkr.co/${id}" height="${this.options.codeEmbedHeight}"></iframe>
        </div>`;
        return template;
	}
}

module.exports = Plunker;
