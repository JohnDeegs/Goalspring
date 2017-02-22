// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = Number(process.env.PORT || 8080);
var passport = require('passport');
var flash    = require('connect-flash');

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(__dirname + '/views/css'));
app.use(express.static(__dirname + '/views/js'));
app.use(express.static(__dirname + '/config'));
app.use(express.static(__dirname + '/app'));


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

var http = require("http");
setInterval(function() {
    http.get("https://still-stream-97435.herokuapp.com");
}, 300000); // every 5 minutes (300000)

app.use(function (req, res, next){
	if(req.headers['x-forwarded-proto'] === 'https'){
		res.redirect('http://' + req.hostname + req.url);
	}else{
		next();
	}
});

app.listen(port);
console.log('The magic happens on port ' + port);
