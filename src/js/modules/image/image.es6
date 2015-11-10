const utils     = require('../utils.es6');

if(build.FLICKR)     var Flickr    = require('./flickr.es6');
if(build.INSTAGRAM)  var Instagram = require('./instagram.es6');
if(build.BASICIMAGE) var Basic     = require('./basic.es6');

class Image{
	constructor(input, output, options, embeds){
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
	}

	process(){
		try{
			let input  = this.input;
            let output = this.output;
            let embeds = this.embeds;
            [output,embeds] = utils.ifEmbed(this.options, 'flickr') && build.FLICKR ? (new Flickr(input,output, this.options, embeds).process()) : [output,embeds];
            [output,embeds] = utils.ifEmbed(this.options, 'instagram') && build.INSTAGRAM ? (new Instagram(input,output, this.options, embeds).process()) : [output,embeds];
            [output,embeds] = this.options.imageEmbed && build.BASICIMAGE ? (new Basic(input,output, this.options, embeds).process()) : [output,embeds];

            return [output, embeds];
		}catch(error){
			console.log(error);
		}
	}
}

module.exports = Image;
