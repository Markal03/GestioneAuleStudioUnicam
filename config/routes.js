var express = require('express');
var router = express.Router();

//route di prova
router.get('/', (req, res) => {
    console.log('homepage');
});


module.exports = router;