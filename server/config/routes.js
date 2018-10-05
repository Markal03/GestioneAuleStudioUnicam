var AuthenticationController = require('../app/controllers/authentication'), 
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app) {
    //route di prova
    app.get('/', (req, res) => {
        console.log('homepage');
        //res.render('homepage.ejs');
        res.json({error: 'ciao'});
    });

    app.post('/login', requireLogin, AuthenticationController.login);

    app.post('/register', AuthenticationController.register);

    app.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
    
    app.get('/profile', (req, res) => {
        console.log ('profile');
        res.render(/*nome pagina profilo*/);
    });


    //USER ROUTES

    app.get('/profile', (req,res) =>{

    });

    app.get('/modifyProfile', (req,res) =>{

    });

    app.get('/removeProfile', (req, res) => {

    });

    app.get('/reportUser', (req,res) => {

    });

    //NEWS FEED ROUTES

    app.get('/newsfeed', (req,res) => {

    });
    
}