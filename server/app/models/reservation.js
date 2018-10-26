const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Inserire l'ora di inizio e l'ora di fine in un unico oggetto?
const ReservationSchema =  new Schema({
    user_id: { type: String, required: [ true, "Inserire l'utente che ha effettuato la prenotazione"] },
    study_room_id: { type: String, required: [true, "Inserire l'aula studio prenotata"] },
    day: { type: String, required: [true, "Inserire il giorno della prenotazione"] },
    from_hour: { type: String, required: [true, "Inserire l'ora di inizio prenotazione"]},
    to_hour: { type: String, required: [true, "Inserire l'ora di fine prenotazione"]}
});



module.exports = mongoose.model('Reservation', ReservationSchema);