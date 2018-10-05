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

<<<<<<< HEAD
    //LOGIN AND REGISTRATION ROUTES

    app.get('/login', requireLogin, AuthenticationController.login);
=======
    app.post('/login', requireLogin, AuthenticationController.login);
>>>>>>> 88406cdc975fdc34a24d0cd758e75375614841be

    app.post('/register', AuthenticationController.register);

    app.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
    
    app.get('/profile', (req, res) => {
        console.log ('profile');
        res.render(/*nome pagina profilo*/);
    });
<<<<<<< HEAD


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
=======
>>>>>>> 88406cdc975fdc34a24d0cd758e75375614841be
    
}