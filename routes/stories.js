
/*	Stories RESTful API
---------------------------------------------------------------------- */

// Dependencies
var restful = require('node-restful'),
	mongoose = restful.mongoose;


// Stories Schema
var Stories = restful.model('stories', mongoose.Schema({
	pageViews: Number,
	title: String,
	subTitle: String,
	slug: String,
	author: String,
	content: String,
	isFeatured: String,
	coverPhoto: String,
	hasVideo: String,
	date: String,
	css: String,
	status: String,
	js: String

}));


// Register Endpoints
module.exports = function(app){
	Stories.methods(['get', 'put', 'post', 'delete']);
	Stories.register(app, '/api/stories');
};