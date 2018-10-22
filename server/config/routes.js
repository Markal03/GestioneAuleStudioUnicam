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

    app.get('/getUserInfos', requireAuth, UserController.getUserInfos);

    app.put('/modifyPassword', requireAuth, UserController.modifyPassword);

    app.put('/modifyProfileImage', requireAuth, UserController.modifyProfileImage);

    app.delete('/removeProfile', requireAuth, UserController.delete);

    //NEWS FEED ROUTES

    app.get('/newsfeed', (req,res) => {

    });

    //STUDY ROOM ROUTES FOR ADMIN

    
    app.get('/adminSection', AuthenticationController.isAdmin);

    app.post('/addStudyRoom', requireAuth, AuthenticationController.isAdmin, StudyRoomController.addStudyRoom);

    app.put('/modifyStudyRoom', requireAuth, AuthenticationController.isAdmin, StudyRoomController.modifyStudyRoom);

    app.delete('/deleteStudyRoom', requireAuth, AuthenticationController.isAdmin, StudyRoomController.deleteStudyRoom);

    //STUDY ROOM ROUTES FOR STUDENTS

    app.get('/studyRooms', StudyRoomController.browseStudyRooms);
    
    app.post('/bookStudyRoom', (req, res) =>{

    });

}