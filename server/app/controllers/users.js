const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const User = mongoose.model('User');

exports.delete = (req, res) => {
    var id= req.param("id");
        User.remove({
            _id:id
        }, function(err){
            if(err){
            console.log(err);
            res.status(400).send({ error: "Errore nell'eliminazione del profilo" });
        } else {
          return  res.send("Eliminazione confermata");
        }
        });
};

exports.modifyPassword = (req, res) => {
    var id = req.param("id");
    User.findById(req.params.id, function(err, user){
        if (err) {
            res.status(400).send({ error: err });
        }

        user.hashed_password = req.body.hashed_password;

        user.save(function(err){
            if (err){
                res.status(400).send({ error: err });
            }

            res.send({message: 'Password aggiornata'});
        });

    });
};

exports.modifyProfileImage=(req, res) => {

};
