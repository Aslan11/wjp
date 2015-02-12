var express = require('express'),
	restful = require('node-restful'),
	mongoose = restful.mongoose,
	basicAuth = require('basic-auth'),
	twit = require('twit');
var app = express();

/* Authorization Middleware
---------------------------------------------------------------------- */
var auth = function (req, res, next) {
	function unauthorized(res) {
		res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
		return res.send(401);
	}
	var user = basicAuth(req);
	if (!user || !user.name || !user.pass) {
		return unauthorized(res);
	}
	if (user.name === 'WestonJamesPalmer' && user.pass === 'admin') {
		return next();
	} else {
		return unauthorized(res);
	}
};

/*	General Settings
---------------------------------------------------------------------- */
app.configure(function() {
	app.set('port', process.env.PORT || 1337);
	app.use(express.static(__dirname + '/public'));
	app.use("/admin/app", express.static(__dirname + "/admin/app"));
	app.use("/admin/libs", express.static(__dirname + "/admin/libs"));
	app.use("/admin/templates", express.static(__dirname + "/admin/templates"));
	app.use("/admin/tests", express.static(__dirname + "/admin/tests"));
	app.use(express.bodyParser({uploadDir:'./public/styles/img/'}));
	app.use(express.methodOverride());
});

/*	Add Headers
---------------------------------------------------------------------- */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1337');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/*	MongoDB Connection
---------------------------------------------------------------------- */
mongoose.connect('mongodb://localhost/wjp');

/*	Twitter Connection
---------------------------------------------------------------------- */
var T = new twit({
    consumer_key:         'NppZ2wN2yJ3t5LuxgPQZvt5Zt'
  , consumer_secret:      'g3AjFKTFaFP1wgaIvPMy52s3cDcSIQwJYFCmUsbQbeub0nObhq'
  , access_token:         '293374786-cSJZ5ZWKFrHsEP47O5ZyjwP7kAksPb6SJC3g74oi'
  , access_token_secret:  '1d2tsMSuYukCX8CJcdtMuaWMwwVljvd3z57Y6UxxetSmW'
})

var params = {
	screen_name: 'WestonJamesP', // the user id passed in as part of the route
	count: 10 // how many tweets to return
};

var tweets = '';

T.get('/statuses/user_timeline', params, function(err, data, response) {
  tweets = data;
})


app.get('/tweets', function(req, res){
	res.send(tweets);
});

/*	API Routes
---------------------------------------------------------------------- */
require('./routes/stories')(app);
require('./routes/experiences')(app);
require('./routes/tracks')(app);

/*	Admin Route
---------------------------------------------------------------------- */
app.get('/admin', express.basicAuth('admin', 'admin'), function(req, res){
	app.configure(function() {
		app.use("/admin", express.static(__dirname + "/admin"));
	});
	res.sendfile('./admin/index.html');
});

app.post('/file-upload', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    res.send('File ' + req.files.filepreview.name + ' uploaded! \n File URL: /' + req.files.filepreview.path);
});

/*	Angular Route (Default)
---------------------------------------------------------------------- */
app.get('*', function(req, res){
	res.sendfile('./public/index.html');
});

/*	Start the app
---------------------------------------------------------------------- */
app.listen(app.get('port'));
console.log('Killing it on '+app.get('port'));
exports = module.exports = app;
