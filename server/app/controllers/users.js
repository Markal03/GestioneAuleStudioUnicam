const mongoose = require('mongoose');
const express = require('express');
const User = mongoose.model('User');

exports.getUserInfos = (req, res) => {
    var id = req.user._id;
    User.findById(id, (err, user) => {
        if (err) {
            res.status(400).send({ message: err });
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

exports.getUsersList = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(400).send({ message: err });
        }
        res.status(200).send(users);
    });
};

exports.delete = (req, res) => {
    let id = req.user._id;
    deleteProfile(id, res);
};

exports.adminDelete = (req, res) => {
    let id = req.params.user_id;
    deleteProfile(id, res);
};

exports.modifyPassword = (req, res) => {
    var id = req.user._id;
    User.findById(id, function(err, user){
        if (err) {
            res.status(400).send({ message: err });
        }
        
        user.comparePasswords(req.body.oldPassword, user.hashed_password, function (err, isMatch) {
            if(err){
                console.log("Non ho capito");
                return res.status(400).json(err);
            }

            if(!isMatch){
                console.log("ciccio hai sbagliato pswd");
                return res.status(422).json("Vecchia password errata");
            }

            user.hashed_password = req.body.newPassword;

            user.save(function(err){
                if (err){
                    res.status(400).send({ message: err });
                }
    
                res.status(200).json({message: 'Password aggiornata'});
            });
        })


    });
};

exports.modifyProfileImage=(req, res) => {

};


function deleteProfile(id, res) {
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
}