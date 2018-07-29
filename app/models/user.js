const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
var salt_value = 10;

const UserSchema = new Schema({
    name: { type: String, required: [true, 'Inserisci il tuo nome'] },
    surname: { type: String, required: [true, 'Inserisci il tuo cognome'] },
    email: { type: String, default: '', index: { unique = true }, required: [true, 'Inserisci la tua email Unicam'] },
    hashed_password: { type: String, required: [true, 'Inserisci una password'] },
});


//Virtuals

UserSchema.virtual('fullName').get(() => {
    return this.name + ' ' + this.surname;
});


//pre

UserSchema.pre('save', (next) => {
    // aggiorna la password solo se è appena modificato o è nuovo 
    if (!this.isNew || !this.isModified('hashed_password')) return next();
    // generate a salt
    bcrypt.genSalt(salt_value, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(this.hashed_password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            this.hashed_password = hash;
            next();
        });
    });
});


// Validatori custom

UserSchema.path('name').validate((name) => {
    return name.length;
}, 'Il nome non può essere vuoto');

// controlla se l'email è formata da nome, punto, cognome, eventualmente un numero e @studenti.unicam.it
UserSchema.path('email').validate((email) => {
    var regexp = /([a-z]+).([a-z]+)[0-9]*@studenti.unicam.it/;
    // null se non corrisponde, altrimenti un array in cui al primo posto è presente la stringa, e negli altri gli elementi indicati dalle parentesi
    var results = email.match(regexp);
    // la mail non è valida
    if (!results) return false;
    else {
        var name = results[1];
        var surname = results[2];
        // il nome e il cognome della mail devono essere uguali al nome e al cognome inserito
        return this.name === name && this.surname === surname;

    }
}, "L'email inserita non è valida" );

UserSchema.path('email').validate((email) => {
    const User = mongoose.model('User');
    // controllo solo se l'utente è nuovo 
    if (this.isNew) {
        User.find({email: email}).exec((err, users) => {
            // la query deve ritornare 0 se non c'è nessun utente con quella email
            return !err && users.length === 0;
        });
    } else return true;
}, "Uno studente registrato con l'email inserita è già presente");

UserSchema.path('hashed_password').validate((hashed_password) => {
    return hashed_password.length;
}, 'La password non può essere vuota');


//Methods

UserSchema.methods = {
    // come callback usa "(err, matched) => {...}"
    comparePasswords: (possiblePassword, cb) => {
        bcrypt.compare(possiblePassword, this.hashed_password, (err, matched) => {
            if (err) return cb(err);
            cb(null, matched);
        });
    }
};

mongoose.model('User', UserSchema);
//module.exports = mongoose.model('User', schemaUtente);