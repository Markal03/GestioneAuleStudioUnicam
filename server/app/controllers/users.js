const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserSchema =

exports.create = (req, res) => {
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    if (password===passwordConfirm) {
        var user= new User();
        user.name = req.body.name; 
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.hashed_password = password;
        if (user.save()) {
            return res.redirect ("/");
        }
    }else{
        console.log("Password non coincidono");
        return res.redirect("/register");
    }
    
};

exports.delete=(req,res) =>{

};

exports.findOne= (req,res) =>{
    var email = req.body.email;
    var password = req.body.password;

    var userschema = new UserSchema();
    userschema.statics.authenticate = function (email, password, callback) {
        User.findOne({email:email})
        .exec(function (err, user){
            if(err){
                return callback(err)
            }else if (!user){
                var err = new Error ('Utente non trovato');
                err.status = 401;
                return callback(err);
            }

            if ( userschema.comparePasswords(password, callback)) {
                console.log("Trovato");
                return res.redirect('/');
            }
           ;
        })
        
    }
};
