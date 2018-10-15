var AuthenticationController = require('../app/controllers/authentication'), 
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport'),
    UserController = require('../app/controllers/users'),
    StudyRoomController = require('../app/controllers/study_rooms');
 
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

    app.get('/getUserInfos/:id', checkAuth, UserController.getUserInfos);

    app.put('/modifyPassword/:id', checkAuth, UserController.modifyPassword);

    app.put('/modifyProfileImage/:id', checkAuth, UserController.modifyProfileImage);

    app.delete('/removeProfile/:id', checkAuth, UserController.delete);

    //NEWS FEED ROUTES

    app.get('/newsfeed', (req,res) => {

    });

    //STUDY ROOM ROUTES FOR ADMIN

    
    app.get('/adminSection', (req, res) =>{

    });

    app.post('/addStudyRoom', StudyRoomController.addStudyRoom);

    app.put('/modifyStudyRoom', (req, res) =>{

    });

    app.delete('/deleteStudyRoom', (req, res) =>{

    });

    //STUDY ROOM ROUTES FOR STUDENTS

    app.get('/studyRooms', (req, res) =>{

    });
    
    app.post('/bookStudyRoom', (req, res) =>{

    });

}