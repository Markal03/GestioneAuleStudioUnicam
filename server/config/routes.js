var AuthenticationController = require('../app/controllers/authentication'), 
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport'),
    UserController = require('../app/controllers/users'),
    StudyRoomController = require('../app/controllers/study_rooms'),
    ReservationController = require('../app/controllers/reservations');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app) {

    app.post('/login', requireLogin, AuthenticationController.login);

    app.post('/register', AuthenticationController.register);

    app.get('/protected', requireAuth, AuthenticationController.protected);


    //STUDENT ROUTES

    app.get('/getUserInfos', requireAuth, UserController.getUserInfos);

    app.put('/modifyPassword', requireAuth, UserController.modifyPassword);

    app.put('/modifyProfileImage', requireAuth, UserController.modifyProfileImage);

    app.delete('/removeProfile', requireAuth, UserController.adminDelete);


    //STUDY ROOM ROUTES FOR ADMIN

    app.get('/adminSection', requireAuth, StudyRoomController.browseStudyRooms);

    app.get('/usersList', requireAuth, UserController.getUsersList);

    app.post('/addStudyRoom', requireAuth, StudyRoomController.addStudyRoom);

    app.put('/modifyStudyRoom', requireAuth, StudyRoomController.modifyStudyRoom);

    app.delete('/deleteStudyRoom/:name', requireAuth, StudyRoomController.deleteStudyRoom);

    app.delete('/deleteUser/:name', requireAuth, UserController.adminDelete);
     
    //TODO
    //app.delete('/deleteReservation', requireAuth, ReservationController.deleteReservation);


    //STUDY ROOM ROUTES FOR STUDENTS

    app.get('/studyRooms', requireAuth, StudyRoomController.browseStudyRooms);
    
    app.post('/bookStudyRoom', requireAuth, ReservationController.addReservation);

    app.get('/getReservations', requireAuth, ReservationController.getReservation);

    app.put('/modifyReservation', requireAuth, ReservationController.modifyReservation);

    app.delete('/deleteReservation', requireAuth, ReservationController.deleteReservation);

}