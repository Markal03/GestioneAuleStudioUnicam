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

    //LOGIN AND REGISTRATION ROUTES

    app.get('/login', requireLogin, AuthenticationController.login);

    app.get('/register', requireAuth, AuthenticationController.register);
    
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

    //STUDY ROOM ROUTES

    app.get('/')

    app.post('/registraUtente', (req,res) => {
        console.log ('registra utente');
        users.create(req, res);
    });

    app.post('/loginUtente', (req,res)=>{
        console.log('login utente');
        users.findOne(req, res);
    });
    
}