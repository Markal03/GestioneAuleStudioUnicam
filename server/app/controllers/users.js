const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const User = mongoose.model('User');

exports.getUserInfos = (req, res) => {
    var id= req.param("id");
    User.findById(req.params.id, function(err, user){
        if (err) {
            res.status(400).send({ error: err });
        }

        var userInfos = {
            name: user.name,
            surname: user.surname,
            email: user.email,
            profile_image: user.profile_image
        }
        
        res.status(200).json(userInfos);
    });
};

exports.delete = (req, res) => {
    var id= req.param("id");
    User.remove({
        _id:id
    }, function(err){
        if(err){
        console.log(err);
        return res.status(400).json("Errore nell'eliminazione del profilo" );
    } else {
        return res.status(200).json("Eliminazione confermata");
    }
    });
};

exports.modifyPassword = (req, res) => {
    var id = req.param("id");
    User.findById(req.params.id, function(err, user){
        if (err) {
            res.status(400).send({ error: err });
        }

        user.comparePasswords(req.body.oldPassword, user.hashed_password, function (err, isMatch) {
            if(err){
                console.log("Meeeenghia, nn o cpt");
                return res.status(400).json(err);
            }

            if(!isMatch){
                console.log("ciccio hai sbagliato pswd");
                return res.status(422).json("Vecchia password errata");
            }

            user.hashed_password = req.body.newPassword;

            user.save(function(err){
                if (err){
                    res.status(400).send({ error: err });
                }
    
                res.status(200).json({message: 'Password aggiornata'});
            });
        })


    });
};

exports.modifyProfileImage=(req, res) => {

};
