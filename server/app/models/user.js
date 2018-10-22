const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
var salt_value = 10;

const UserSchema = new Schema({
    name: { type: String, required: [true, 'Inserisci il tuo nome'] },
    surname: { type: String, required: [true, 'Inserisci il tuo cognome'] },
    email: { type: String, unique: true, required: [true, 'Inserisci la tua email Unicam'] },
    hashed_password: { type: String, required: [true, 'Inserisci una password'] },
    profile_image: { type: Buffer, required: false },
    admin: { type: Boolean, required: true, default: false }
});


// Virtuals, parametri che non vengono salvati nel db ma che possono essere richiamati

UserSchema.virtual('fullName').get(() => {
    return this.name + ' ' + this.surname;
});


// Pre, avvengono in automatico prima di save

UserSchema.pre('save', function(next)  {
    // aggiorna la password solo se è appena modificato o è nuovo 
    if (this.isNew || this.isModified('hashed_password')) {
        // hash the password using our new salt
        var saveThis = this;
        bcrypt.hash(this.hashed_password, salt_value, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            saveThis.hashed_password = hash;
            next();
        });
    } 
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
    return hashed_password.length > 0;
}, 'La password non può essere vuota');


//Methods
// come callback usa "(err, matched) => {...}"
UserSchema.methods.comparePasswords = (possiblePassword, hashed_password, cb) => {
        var user = this;
        bcrypt.compare(possiblePassword, hashed_password, (err, matched) => {
            if (err) {
                return cb(err);
            }
            cb(null, matched);
        });
}

module.exports = mongoose.model('User', UserSchema);