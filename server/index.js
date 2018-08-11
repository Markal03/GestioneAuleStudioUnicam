const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
require('./app/models/user');

const app = express();

// import dei setting di express
require('./config/express')(app);
// import di tutte le routes di routes.js
require('./config/routes')(app);

module.exports = app;


// richiama la connessione al db e l'apertura del server
connectToDb()
  .on('error', console.log)
  .on('disconnected', connectToDb)
  .once('open', listen);

function connectToDb() {
    // connessione al db remoto 
    mongoose.connect('mongodb://unicamadmin:unicamadmin123@ds020228.mlab.com:20228/unicamaulestudio', { useNewUrlParser: true });
    // return dello stato della connessione
    return mongoose.connection;
}

function listen() {
    //apre il server e lo fa ascoltare sulla porta 3000
    app.listen(3000);
    console.log('fatece vedè er pupone');
}




/*
// TEST 
require('./app/models/user');
mongoose.connect('mongodb://unicamadmin:unicamadmin123@ds020228.mlab.com:20228/unicamaulestudio', { useNewUrlParser: true });
app.listen(3000);
const User = mongoose.model('User');
//User.collection.drop();
var user2 = new User();
user2.name = "leonardo"; 
user2.surname = "nooooooo";
user2.email = "macristooooooaaa.noooooa@studenti.unicam.it";
user2.hashed_password = "asdaaaaaaaaaaaa";
user2.save();
User.find({}).exec((err, users) => {
    console.log(users);
}); */ 
// TEST