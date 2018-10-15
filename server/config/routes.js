var AuthenticationController = require('../app/controllers/authentication'), 
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport'),
    UserController = require('../app/controllers/users');
 
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

    //STUDENT ROUTES

    app.get('/profile', (req,res) =>{

    });

    app.put('/modifyPassword/:id', UserController.modifyPassword);

    app.put('/modifyProfileImage/:id', UserController.modifyProfileImage);

    app.delete('/removeProfile/:id', UserController.delete);

    //NEWS FEED ROUTES

    app.get('/newsfeed', (req,res) => {

    });

    //STUDY ROOM ROUTES FOR ADMIN

    
    app.get('/adminSection', (req, res) =>{

    });

    app.post('/addStudyRoom', (req, res) =>{

    });

    app.put('/modifyStudyRoom', (req, res) =>{

    });

    app.post('/deleteStudyRoom', (req, res) =>{

    });

    //STUDY ROOM ROUTES FOR STUDENTS

    app.get('/studyRooms', (req, res) =>{

    });
    
    app.post('/bookStudyRoom', (req, res) =>{

    });

}