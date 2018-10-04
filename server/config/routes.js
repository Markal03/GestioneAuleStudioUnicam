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

    app.get('/login', requireLogin, AuthenticationController.login);

    app.get('/register', AuthenticationController.register);
    
    app.get('/profile', (req, res) => {
        console.log ('profile');
        res.render(/*nome pagina profilo*/);
    });

    app.post('/registraUtente', (req,res) => {
        console.log ('registra utente');
        users.create(req, res);
    });

    app.post('/loginUtente', (req,res)=>{
        console.log('login utente');
        users.findOne(req, res);
    });
    
}