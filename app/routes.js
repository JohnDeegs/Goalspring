// app/routes.js
module.exports = function(app, passport) {

	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host: 'us-cdbr-iron-east-04.cleardb.net',
		user: 'b74d68f5eda681',
		password: '7e304855',
		database : 'heroku_48633fb70d7d1e2'
	});

	connection.connect();

//This is a fix for the cleardb server shutting down if not used for a few minutes which makes the heroku app crash, keeps the db connection active
	setInterval(function () {
	    connection.query('SELECT 1');
	}, 5000);

	// =====================================
	// Home (with login links)
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");
						//user timeout if inactive
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP
	// =====================================


	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));


	// =====================================
	// PROFILE SECTION
	// =====================================


	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/tasks/list', isLoggedIn, function(req, res){

		var id = req.user.id;

		connection.query("SELECT * from tasks where user_id = ?", id, function(err, result){
			if(err) throw err;

			res.send(JSON.stringify(result));
		});
	});

	app.post('/tasks/create', isLoggedIn, function(req, res){

		var data = {};

		data.name = req.body.name;
		data.start = req.body.start;
		data.end = req.body.end;
		data.user_id = req.user.id;


		console.log(data);

		connection.query("INSERT into tasks set ?", data, function(err, result){
			if(err) throw err;
			res.send("Created "+JSON.stringify(result));
			console.log("All good")
		});

	});


	// =====================================
	// LOGOUT
	// =====================================


	app.get('/logout', function(req, res) {
		req.logout();
		//res.redirect('/');
		res.render('index.ejs'); // load the index.ejs file
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
