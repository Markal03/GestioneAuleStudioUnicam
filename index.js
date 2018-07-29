const express = require('express');
//middleware che permette di accedere al body della request sotto forma di oggetto javascript, tramite req.body
const bodyParser= require('body-parser');
const app = express();
//import di tutte le routes di routes.js
var router = require('./config/routes.js');

//Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) 
//and exposes the resulting object (containing the keys and values) on req.body
app.use(bodyParser.urlencoded({extended: true}));

//collega le routes all'app
app.use(router);

//apre il server e lo fa ascoltare sulla porta 3000
app.listen(3000, () => {
    console.log('fatece vedè er pupone');
});