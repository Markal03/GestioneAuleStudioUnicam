const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema =  new Schema({
    user_id: { type: String, required: [ true, "Inserire l'utente che ha effettuato la prenotazione"] },
    study_room_infos: { type: { name: String, address: String }, required: [true, "Inserire l'aula studio prenotata"] },
    day: { type: String, required: [true, "Inserire il giorno della prenotazione"] },
    from_hour: { type: Number, required: [true, "Inserire l'ora di inizio prenotazione"]},
    to_hour: { type: Number, required: [true, "Inserire l'ora di fine prenotazione"]},
    creation_time: { type: {time: String, day: String}, required: [true, "Ora di creazione mancante"]}
});



module.exports = mongoose.model('Reservation', ReservationSchema);