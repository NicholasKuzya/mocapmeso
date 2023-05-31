const { Schema, model } = require('mongoose');
const Admin = new Schema({
	email: {type: String, required: true, unique: true},
	name: String,
	password: String,
	avatars: {
		url: String,
		alt: String
	},
});
module.exports = model('Admin', Admin);