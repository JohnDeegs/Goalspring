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

	app.get('/profile/createtask', isLoggedIn, function(req, res) {
		res.render('createtask.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/tasks', isLoggedIn, function(req, res){

		var id = req.user.id;

		connection.query("SELECT * from tasks where id = ?", id, function(err, result){
			if(err) throw err;
			res.send("Recieved "+JSON.stringify(result));
		});
	});

	app.post('/create', isLoggedIn, function(req, res){

		var data = {};
		data.taskID = req.body.taskID;
		data.title = req.body.task;
		data.taskDate = req.body.taskDate;
		data.duration = req.body.duration;
		data.id = req.user.id;

		console.log(data);

		connection.query("INSERT into tasks set ?", data, function(err, result){
			if(err) throw err;
			res.send("Created "+JSON.stringify(result));
		});

	});


	// =====================================
	// LOGOUT
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		//res.redirect('/');
		connection.destroy();
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
