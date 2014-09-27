
/*	Experiences RESTful API
---------------------------------------------------------------------- */

// Dependencies
var restful = require('node-restful'),
	mongoose = restful.mongoose;


// Experiences Schema
var Experiences = restful.model('experiences', mongoose.Schema({
	pageViews: Number,
	title: String,
	subTitle: String,
	slug: String,
	credits: String,
	content: String,
	type: String,
	coverPhoto: String,
	videoEmbed: String,
	date: String,
	css: String,
	status: String,
	js: String,
	slideCount: Number,
	slideURLS: {
		one: String,
		two: String,
		three: String,
		four: String,
		five: String,
		six: String
	}

}));


// Register Endpoints
module.exports = function(app){
	Experiences.methods(['get', 'put', 'post', 'delete']);
	Experiences.register(app, '/api/experiences');
};