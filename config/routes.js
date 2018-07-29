const users = require('../app/controllers/users');

module.exports = function(app) {
    //route di prova
    app.get('/', (req, res) => {
        console.log('homepage');
        res.render('homepage.ejs');
    });
}