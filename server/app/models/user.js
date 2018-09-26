const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
var salt_value = 10;

const UserSchema = new Schema({
    name: { type: String, required: [true, 'Inserisci il tuo nome'] },
    surname: { type: String, required: [true, 'Inserisci il tuo cognome'] },
    email: { type: String, unique: true, required: [true, 'Inserisci la tua email Unicam'] },
    hashed_password: { type: String, required: [true, 'Inserisci una password'] },
});


// Virtuals, parametri che non vengono salvati nel db ma che possono essere richiamati

UserSchema.virtual('fullName').get(() => {
    return this.name + ' ' + this.surname;
});


// Pre, avvengono in automatico prima di save

UserSchema.pre('save', function(next)  {
    // aggiorna la password solo se è appena modificato o è nuovo 
    if (this.isNew || this.isModified('hashed_password')) {
        // hash the password using our new salt*/
        bcrypt.hash(this.hashed_password, salt_value, function(err, hash) {
            if (err)  console.log(err);
            //return next(err);
            // override the cleartext password with the hashed one
            this.hashed_password = hash;
        });
    } 
    next();
});


// Validatori custom

UserSchema.path('name').validate((name) => {
    var regexp = /[a-z]+$/;
    return name.match(regexp);
}, 'Il nome non è valido');

UserSchema.path('surname').validate((surname) => {
    var regexp = /[a-z]+$/;
    return surname.match(regexp);
}, 'Il cognome non è valido');

// controlla se l'email è formata da nome, punto, cognome, eventualmente un numero e @studenti.unicam.it
UserSchema.path('email').validate((email) => {
    var regexp = /[a-z]+\.[a-z]+[0-9]*@studenti\.unicam\.it$/;
    // null se non corrisponde, altrimenti un array in cui al primo posto è presente la stringa, e negli altri gli elementi indicati dalle parentesi
    return email.match(regexp);
}, "L'email inserita non è valida" );

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