const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const base_days = [
    'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'
];

const base_hours = [];
var i;
for (i = 0; i < 5; i++) { 
    base_hours.push({from: '09:00', to: '18:00'});
}

//TODO modificare hours_open da array a orario singolo
const StudyRoomSchema = new Schema({
    name: { type: String, required: [true, 'Inserisci nome aula studio'], unique: true },
    capacity: { type: Number, required: [true, 'Inserisci capienza aula studio']},
    days_open: { type: [String], required: [true, 'Inserisci giorni di apertura'], default: base_days},
    hours_open: { type: [ { from: String, to: String } ], required: [true, 'Inserisci ore di apertura'], default: base_hours},
    description: { type: String, required: false },
    image: { type: Buffer, required: false }
});

// capacità aula studio compresa tra 0 e 999
StudyRoomSchema.path('capacity').validate((capacity) => {
    return capacity > 0 && capacity < 999;
}, "Il numero di capacità inserito non è valido");

module.exports = mongoose.model('Study Room', StudyRoomSchema);