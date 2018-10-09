var AuthenticationController = require('../app/controllers/authentication'), 
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
    mongoose = require('mongoose');
    User = mongoose.model('User');
 
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


    //STUDENT ROUTES

    app.get('/profile', (req,res) =>{

    });

    app.post('/modifyProfile', (req,res) =>{

    });

    app.delete('/removeProfile/:email', (req, res) => {
        var email= req.param("email");
        User.remove({
            _email=email
        }, function(err){
            if(err){
            console.log(err);
        }else{
          return  res.send("Eliminazione confermata");
        }
        });
    });

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