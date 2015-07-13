// Models
var Movie = require('../models/movie');
var User = require('../models/user');
var _=require('underscore');

// Controllers
var IndexController = require('../controllers/index_controller.js');
var MovieController = require('../controllers/movie_controller.js');
var UserController = require('../controllers/user_controller.js');


module.exports = function(app){
	//#######
	// Middleware for Routes 
	//#######
	app.use(function(req,res,next){
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	});

	//#######
	// routes 
	//#######
	//-- INDEX
	app.get('/',IndexController.index);

	//-- MOVIE 
	// app.get('/list',MovieController.list);
	app.get('/admin/movie/list',UserController.signinRequired, UserController.adminRequired,MovieController.list);
	app.get('/admin/movie',UserController.signinRequired, UserController.adminRequired,MovieController.new);
	app.get('/admin/movie/update/:id',UserController.signinRequired, UserController.adminRequired,MovieController.detail);
	app.post('/admin/movie/new',UserController.signinRequired, UserController.adminRequired,MovieController.saveNew)
	app.get('/movie/:id',MovieController.detail);
	app.delete('/admin/movie/list',UserController.signinRequired, UserController.adminRequired,MovieController.del);

	//-- USER
	app.post('/user/signup',UserController.signup);
	app.post('/user/signin',UserController.signin);
	app.get('/admin/userList', UserController.signinRequired, UserController.adminRequired, UserController.userList);
	app.get('/logout',UserController.logout);
	app.get('/signin',UserController.showSignin);
	app.get('/signup',UserController.showSignup);

};











