
/*	Tracks RESTful API
---------------------------------------------------------------------- */

// Dependencies
var restful = require('node-restful'),
	mongoose = restful.mongoose;


// Tracks Schema
var Tracks = restful.model('tracks', mongoose.Schema({
	pageViews: Number,
	title: String,
	subTitle: String,
	slug: String,
	artist: String,
	embedURL: String,
	date: String,
	status: String
}));


// Register Endpoints
module.exports = function(app){
	Tracks.methods(['get', 'put', 'post', 'delete']);
	Tracks.register(app, '/api/tracks');
};