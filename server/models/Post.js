const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')
const slug = require('mongoose-slug-generator');

const options = {
	separator: "-",
	lang: "en",
	truncate: 120
}
mongoose.plugin(slug, options);
const Post = new Schema({
	title: {type: String, required: true},
	author: String,
	preview: {
		url: String,
		alt: String
	},
	slug: { type: String, slug: ["title"], slug_padding_size: 2, unique: true },
	views: Number,
	date: String,
	content: {type: String, required: true}
}, {timestamps: true});
module.exports = model('Post', Post)