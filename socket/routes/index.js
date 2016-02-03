var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Genre = require('../models/genres');
var Movie = require('../models/movies');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport,io){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/movies',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/movies',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* GET Home Page */
	router.get('/page', isAuthenticated, function(req, res){
		res.render("page", {user:req.user});
	});

	/* Handle Logout */
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* Handle Logout */
	router.get('/test', function(req, res) {
		res.render('test');
	});

	router.get('/movies', isAuthenticated, function(req, res){
		var user = req.user;
		res.render('movies', {user: req.user})
	});

	router.get('/addmovie', isAuthenticated, function(req, res){
		var data = {};
		data.user = req.user;
		data.message = 'Normal';
		res.render('addmovie', {data:data})
	});

	router.post('/addmovie', isAuthenticated, function(req,res){
		var movie = new Movie();
		var data = {};
		data.user = req.user;
		movie.name = req.body.movie;
		movie.genre = req.body.genre;
		movie.save(function(err){
			if(err){
				//do some
			}
			else{
				data.genre = movie.genre;
				data.message = movie.name + " has been added in " + movie.genre+".";
				res.render('addmovie', {data: data});
			}
		})
	})

	router.get('/movies/subscribe', isAuthenticated, function(req, res){

		var user = req.user;
		user.category = req.query.genre;

		User.findOne({ 'username' :  user.username }, function(err, userUpdated) {
			if(err){
				//handle error
			}
			else{
				if(userUpdated.genres.indexOf(user.category) > -1){
					res.render('movies', {user:userUpdated})
				}
				else{
					userUpdated.genres.push(user.category);
					userUpdated.save(function(err){
						if(err){

						}
						else{
							res.render('movies', {user:userUpdated})
						}
					})
				}
			}
		});
	});

	router.get('/movies/unsubscribe', isAuthenticated, function(req, res){

		var user = req.user;
		user.category = req.query.genre;

		User.findOne({ 'username' :  user.username }, function(err, userUpdated) {
			if(err){
				//handle error
			}
			else{
				var index = userUpdated.genres.indexOf(user.category);
				if(index > -1){
					userUpdated.genres.splice(index, 1);
					userUpdated.save(function(err){
						if(err){
							//
						}
						else{
							res.render('movies', {user:userUpdated})
						}
					})
				}
				else{
					res.render('movies', {user:userUpdated})
				}
			}
		});
	});

	return router;
}
