var jwt = require('jsonwebtoken'); 
var User = require('../models/user');
var authConfig = require('../../config/auth');
 
function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}

function setUserInfo(request){
    return {
        _id: request._id,
        email: request.email,
        admin: request.admin
    };
}

exports.protected = (req, res) => {
    res.send({ content: 'Success'});
};

//metodo che si utilizza dopo che passport ha già gestito il login effettivo, quando, di conseguenza, l'utente è già loggato
exports.login = (req, res, next) => {
    var userInfo = setUserInfo(req.user);
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
}

exports.register = (req, res, next) => {
    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    if (!name) {
        return res.status(422).send({error: 'Campo nome necessario'});
    }
    if(!email){
        return res.status(422).send({error: 'Campo email necessario'});
    }
    if(!password){
        return res.status(422).send({error: 'Password necessaria'});
    }
    if(!(password===passwordConfirm)) {
        return res.status(422).send({error: 'Le password inserite non coincidono'});
    }
    User.findOne({email: email}, function(err, existingUser){
        if(err) {
            return next(err);
        }

        if(existingUser) {
            return res.status(422).send({error: 'Un account che utilizza la mail inserita è già esistente'});
        }

        var user = new User({
            name: name,
            surname: surname,
            email: email,
            hashed_password: password,
        });
 
        user.save(function(err, user){
            if(err){
                return next(err);
            }
 
            var userInfo = setUserInfo(user);
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
        });
    });
}

exports.isAdmin = (req, res, next) => {
    if (req.user.admin) {
        console.log("admin:" + req.user.admin);
        return next();
    }
    else {
        console.log("come te permetti");
        res.status(400).send({error: "L'utente non è un admin di sistema"});
    }
};