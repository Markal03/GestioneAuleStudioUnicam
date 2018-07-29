const express = require('express');
//middleware che permette di accedere al body della request sotto forma di oggetto javascript, tramite req.body
const bodyParser= require('body-parser');
const app = express();

//Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) 
//and exposes the resulting object (containing the keys and values) on req.body
app.use(bodyParser.urlencoded({extended: true}));

//route di prova
app.get('/', (req, res) => {
    console.log('homepage');
});

//apre il server e lo fa ascoltare sulla porta 3000
app.listen(3000, () => {
    console.log('fatece vedè er pupone');
});