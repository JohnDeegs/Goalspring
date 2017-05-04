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

		var user_id = req.user.id;

		var someDate = new Date();

		//someDate.setDate(someDate.getDate());

		connection.query("SELECT * FROM tasks where user_id = ? ORDER BY start DESC", user_id, function(err, result){
			if(!!err){
				console.log("Error selecting data from db");
			}else{
				res.render('profile.ejs', {
					dbdata: result,
					today: someDate,
					user : req.user // get the user out of session and pass to template
				});
				console.log("Success getting db data");
			}
		});


	});

	app.get('/tasks/day/:id', isLoggedIn, function(req, res){
		//get the params that we created in landing.js
		var id = req.params.id;
		//split the date in params for further manipulation
		var str = id.split("");
		//get the first two digits of param which contains the days
		var days = ''+str[0]+''+str[1]+'';
		//get the next two digits which contain the months
		var month = ''+str[2]+''+str[3]+'';
		//get the final 4 digits which contain the year
		var year = ''+str[4]+''+str[5]+''+str[6]+''+str[7]+'';
		//put them together for mysql datetime format
		//creating two for the query
		var formattedDate = ''+year+'-'+month+'-'+days+' 00:00:00';
		var endDate = ''+year+'-'+month+'-'+days+' 23:59:59';

		//console.log(str);
		//console.log(days);
		//console.log(year);
		console.log(formattedDate);
		console.log(endDate);

		//getting the users identity
		var user_id = req.user.id;

		//console.log(id);

		connection.query("SELECT * FROM tasks where user_id = ? AND start >= ? AND start <= ? ORDER BY start ASC", [user_id, formattedDate, endDate], function(err, result){
			if(!!err){
				console.log("Error selecting data from db");
			}else{
				res.render('tasks.ejs', {
					dbdata: result,
					user : req.user // get the user out of session and pass to template
				});
				console.log("Success getting db data");
				console.log(result);
			}
		});

	});

	app.get('/tasks/day/count/:id', isLoggedIn, function(req, res){
		//get the params that we created in landing.js
		var id = req.params.id;
		//split the date in params for further manipulation
		var str = id.split("");
		//get the first two digits of param which contains the days
		var days = ''+str[0]+''+str[1]+'';
		//get the next two digits which contain the months
		var month = ''+str[2]+''+str[3]+'';
		//get the final 4 digits which contain the year
		var year = ''+str[4]+''+str[5]+''+str[6]+''+str[7]+'';
		//put them together for mysql datetime format
		//creating two for the query
		var formattedDate = ''+year+'-'+month+'-'+days+' 00:00:00';
		var endDate = ''+year+'-'+month+'-'+days+' 23:59:59';

		//console.log(str);
		//console.log(days);
		//console.log(year);
		//console.log(formattedDate);

		//getting the users identity
		var user_id = req.user.id;

		//console.log(id);

		connection.query("SELECT * FROM tasks where user_id = ? AND start >= ? AND start <= ? ORDER BY start ASC", [user_id, formattedDate, endDate], function(err, result){
			if(!!err){
				console.log("Error selecting data from db");
			}else{
				res.send(result);
				console.log("Success getting db data");
			}
		});

	});

	app.get('/tasks/get/:id', isLoggedIn, function(req, res){

		var user_id = req.user.id;
		var id = req.params.id;

		connection.query("SELECT * FROM tasks where user_id = ? and id = ?", [user_id, id], function(err, result){
			if(!!err){
				console.log("Error selecting data from db");
			}else{
				res.send(result);
				console.log("Success getting db data");
			}
		});

	});

	app.post('/tasks/day/single/create', isLoggedIn, function(req, res){

		var user_id = req.user.id;
		console.log(user_id);

		var id = req.params.id;
		console.log(id);

		var data = {};

	  data.name = req.body.name;
	  data.category = req.body.category;
	  data.start = req.body.start;
	  data.end = req.body.end;
	  data.user_id = req.user.id;

		console.log(data);

		connection.query("INSERT into tasks set ?", data, function(err, result){
	    if(err) throw err;
	    res.redirect(req.get('referer'));
	    console.log("All good")
	  });

	});

	app.get('/tasks/day/single/edit/:id', isLoggedIn, function(req, res) {

		var user_id = req.user.id;
		//console.log(user_id);

		var id = req.params.id;
		//console.log(id);

		connection.query("SELECT * FROM heroku_48633fb70d7d1e2.tasks where id = ? AND user_id = ?", [id, user_id], function(err, result){
			if(!!err){
				console.log("Error getting data");
			}else{
				res.render('edit.ejs', {
					selectedData: result,
				});
				//console.log("Success getting one task");
			}
		});

	});


	app.post('/tasks/days/single/edit/save/:id', isLoggedIn, function(req, res){
		var user_id = req.user.id;
		console.log(user_id);

		var id = req.params.id;
		console.log(id);

		var data = {};

	  data.name = req.body.name;
	  data.category = req.body.category;
	  data.start = req.body.start;
	  data.end = req.body.end;
	  data.user_id = req.user.id;

		console.log(data);

		connection.query("UPDATE tasks set ? WHERE id = ?", [data, id], function(err, result){
			if(!!err){
				console.log("Error getting data");
			}else{
				res.redirect('/profile');
				//console.log("Success getting one task");
			}
		});
	});


	//DELETE

	app.get('/tasks/days/single/delete/:id', isLoggedIn, function(req, res){

		var user_id = req.user.id;
		console.log(user_id);

		var id = req.params.id;
		console.log(id);

		connection.query("DELETE from tasks where id = ?", id, function(err, result){
			if(!!err){
				console.log("Error getting data!");
			}else{
				console.log("Success!");
				res.redirect('/profile');
			}
		})

	});

	//COUNT

	app.get('/tasks/days/count', isLoggedIn, function(req, res){

		var user_id = req.user.id;

		connection.query("SELECT count(*) from tasks where user_id = ?", user_id, function(err, result){

			if(!err){
				console.log("Error getting data!");
				return;
			}else{
				console.log("Success getting count");
				res.send(result);
			}

		});


	});



	app.get('/tasks/days/analyze/:id', isLoggedIn, function(req, res){

		var user_id = req.user.id;

		console.log(user_id);

		//get the params that we created in landing.js
		var id = req.params.id;
		//split the date in params for further manipulation
		var str = id.split("");
		//get the first two digits of param which contains the days
		var days = ''+str[0]+''+str[1]+'';
		//get the next two digits which contain the months
		var month = ''+str[2]+''+str[3]+'';
		//get the final 4 digits which contain the year
		var year = ''+str[4]+''+str[5]+''+str[6]+''+str[7]+'';
		//put them together for mysql datetime format
		//creating two for the query
		var formattedDate = ''+year+'-'+month+'-'+days+' 00:00:00';
		var endDate = ''+year+'-'+month+'-'+days+' 23:59:59';

		connection.query("SELECT * FROM tasks where user_id = ? AND start >= ? AND start <= ? ORDER BY start ASC", [user_id, formattedDate, endDate], function(err, result){
			if(!!err){
				console.log("Error selecting data from db");
			}else{
				res.render('analyze.ejs', {
					dbdata: result,
					user : req.user // get the user out of session and pass to template
				});
				console.log("Success getting db data");
				console.log(result);
			}
		});

	});

	app.get('/tasks/days/analyze/get/:id', isLoggedIn, function(req, res){

		var user_id = req.user.id;

		console.log(user_id);

		console.log("Calling me");

		//get the params that we created in landing.js
		var id = req.params.id;
		//split the date in params for further manipulation
		var str = id.split("");
		//get the first two digits of param which contains the days
		var days = ''+str[0]+''+str[1]+'';
		//get the next two digits which contain the months
		var month = ''+str[2]+''+str[3]+'';
		//get the final 4 digits which contain the year
		var year = ''+str[4]+''+str[5]+''+str[6]+''+str[7]+'';
		//put them together for mysql datetime format
		//creating two for the query
		var formattedDate = ''+year+'-'+month+'-'+days+' 00:00:00';
		var endDate = ''+year+'-'+month+'-'+days+' 23:59:59';

		connection.query("SELECT * FROM tasks where user_id = ? AND start >= ? AND start <= ? ORDER BY start ASC", [user_id, formattedDate, endDate], function(err, result){
			if(!!err){
				console.log("Error selecting data from db");
			}else{
				res.send(result);
				console.log("Success getting db data");
				console.log(result);
			}
		});

	});

	app.get('/tasks/days/analyze/weekly/:id', isLoggedIn, function(req, res){

		var user_id = req.user.id;

		//==========================================================================
		//Here was are doing as above to get the current date to insert into our
		//mysql query.

		//get the params that we created in landing.js
		var id = req.params.id;
		//split the date in params for further manipulation
		var str = id.split("");
		//get the first two digits of param which contains the days
		var startDay = ''+str[0]+''+str[1]+'';
		//get the next two digits which contain the months
		var startMonth = ''+str[2]+''+str[3]+'';
		//get the final 4 digits which contain the year
		var startYear = ''+str[4]+''+str[5]+''+str[6]+''+str[7]+'';

		//End of start date code
		//==========================================================================

		//==========================================================================

		res.render('analyzeWeekly.ejs');
	});

	app.get('/tasks/days/analyze/weekly/get/:id', isLoggedIn, function(req, res){

		console.log("CALLED");

		var user_id = req.user.id;

		//==========================================================================
		//Here was are doing as above to get the current date to insert into our
		//mysql query.

		//get the params that we created in landing.js
		var id = req.params.id;
		//split the date in params for further manipulation
		var str = id.split("");
		//get the first two digits of param which contains the days
		var startDay = ''+str[0]+''+str[1]+'';
		//get the next two digits which contain the months
		var startMonth = ''+str[2]+''+str[3]+'';
		//get the final 4 digits which contain the year
		var startYear = ''+str[4]+''+str[5]+''+str[6]+''+str[7]+'';

		//End of start date code
		//==========================================================================

		//==========================================================================
		//Start of fiding end date.
		//Here are are getting the current date and adding 7 to it to get 7 days
		//from now and thus the end date for our query

		//To get + 7 days we had 7 to all of our current variables.

		var newDate = new Date();
		newDate.setDate(newDate.getDate() + 7);

		var aDate = newDate.getDate();
    var aMonth = newDate.getMonth() + 1;
    var aDay = newDate.getDay();

    var aYear = newDate.getFullYear();

		if (aDate < 10) {
        aDate = '0' + aDate + '';
    }

    if (aMonth < 10) {
        aMonth = '0' + aMonth + '';
    }

		var stringDate = '' + aDate + '' + aMonth + '' + aYear + '';

		//put them together for mysql datetime format
		//creating two for the query
		var startDate = ''+startYear+'-'+startMonth+'-'+startDay+' 00:00:00';
		var endDate = ''+aYear+'-'+aMonth+'-'+aDate+' 23:59:59';

		console.log(startDate);
		console.log(endDate);

		connection.query("SELECT * FROM tasks WHERE user_id = ? AND start >= ? and START <= ? ORDER BY start ASC", [user_id, startDate, endDate], function(err, result){
			if(!!err){
				console.log("Computer says no");
			}else{
				console.log(result);
				console.log("Success");
				res.send(result);
			}
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
