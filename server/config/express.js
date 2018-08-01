const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser= require('body-parser');


module.exports = function(app) {
    // Static files middleware
    app.use(express.static(path.join(__dirname, '/public')));
    
    app.use(bodyParser.urlencoded({extended: true}));

    // set della path per le views
    //app.set('views', path.join(__dirname, '/app/views'));
    app.set('views', path.join(__dirname, '/../app/views'));
    // set del view engine per l'utilizzo dei file ejs
    app.set('view engine', ejs);

}