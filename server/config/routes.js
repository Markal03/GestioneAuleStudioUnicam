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

    app.post('/modifyProfile', (req,res) =>{

    });

    app.post('/removeProfile', (req, res) => {

    });

    app.get('/reportUser', (req,res) => {

    });

    //NEWS FEED ROUTES

    app.get('/newsfeed', (req,res) => {

    });

    //STUDY ROOM ROUTES FOR ADMIN

    
    app.get('/adminSection', (req, res) =>{

    });

    app.post('/addStudyRoom', (req, res) =>{

    });

    app.post('/modifyStudyRoom', (req, res) =>{

    });

    app.post('/deleteStudyRoom', (req, res) =>{

    });

    //STUDY ROOM ROUTES FOR STUDENTS

    app.get('/studyRooms', (req, res) =>{

    });
    
    app.post('/bookStudyRoom', (req, res) =>{

    });

    
    /*

    DA TOGLIERE

    app.post('/registraUtente', (req,res) => {
        console.log ('registra utente');
        users.create(req, res);
    });

    app.post('/loginUtente', (req,res)=>{
        console.log('login utente');
        users.findOne(req, res);
    });
    */
}