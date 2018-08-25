const mongoose = require('mongoose');
const User = mongoose.model('User');

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
    
};
