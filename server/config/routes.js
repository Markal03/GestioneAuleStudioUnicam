const users = require('../app/controllers/users');

module.exports = function(app) {
    //route di prova
    app.get('/', (req, res) => {
        console.log('homepage');
        res.render('homepage.ejs');
    });

    app.get('/login', (req, res) => {
        console.log ('login');
        res.render('login.ejs');
    });

    app.get('/register', (req, res) => {
        console.log ('register');
        res.render('register.ejs');
    });
    
    app.get('/profile', (req, res) => {
        console.log ('profile');
        res.render(/*nome pagina profilo*/);
    });

    app.post('/registraUtente', (req,res) => {
        console.log ('registra utente');
        users.create;
    });

    app.post('/loginUtente', (req,res)=>{
        console.log('login utente');
        users.find;
    });
    
}