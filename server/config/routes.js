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

    app.get('/getUserInfos/:id', requireAuth, UserController.getUserInfos);

    app.put('/modifyPassword/:id', requireAuth, UserController.modifyPassword);

    app.put('/modifyProfileImage/:id', requireAuth, UserController.modifyProfileImage);

    app.delete('/removeProfile/:id', requireAuth, UserController.delete);

    //NEWS FEED ROUTES

    app.get('/newsfeed', (req,res) => {

    });

    //STUDY ROOM ROUTES FOR ADMIN

    
/*     app.get('/adminSection', (req, res) =>{
        

    }); */

    app.get('/adminSection', requireAuth, StudyRoomController.getStudyRooms); //Ho messo questa al posto di quella commentata

    app.post('/addStudyRoom', requireAuth, StudyRoomController.addStudyRoom);

    app.put('/modifyStudyRoom', requireAuth, StudyRoomController.modifyStudyRoom);

    app.delete('/deleteStudyRoom', requireAuth, StudyRoomController.deleteStudyRoom);

    //STUDY ROOM ROUTES FOR STUDENTS

    app.get('/studyRooms', StudyRoomController.browseStudyRooms);
    
    app.post('/bookStudyRoom', (req, res) =>{

    });

}