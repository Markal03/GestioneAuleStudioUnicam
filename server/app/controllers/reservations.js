const mongoose = require('mongoose');
const Reservation = require('../models/reservation');
const StudyRoom = require('../models/study_room');

exports.adminDeleteReservation = (req, res) => {
    let user_id = req.params.reservationId;
    deleteReservation(user_id, res);
};

exports.getTime = (req, res) => {
    res.status(200).send(getTimeAndDate());
};

exports.deleteReservation = (req, res) => {
    let id = req.params.reservationId;
    deleteReservation(id, res);
};

exports.addReservation = (req, res) => {
    let user_id = req.user._id;
    let name = req.body.study_room_name;
    let address = req.body.study_room_address;
    let study_room_infos = {name: name, address: address};
    let day = req.body.day;
    let from_hour = req.body.from_hour;
    let to_hour = req.body.to_hour;
    let creation_time = getTimeAndDate();
    if (!user_id) {
        res.status(422).json({ message: 'Id utente mancante' });
    }
    if (!study_room_infos) {
        res.status(422).json({ message: 'Informazioni aula studio mancanti' });
    }
    if (!day) {
        res.status(422).json({ message: 'Giorno mancante' });
    }
    if (!from_hour) {
        res.status(422).json({ message: 'Ora inizio prenotazione mancante' });
    }
    if (!to_hour) {
        res.status(422).json({ message: 'Ora fine prenotazione mancante' });
    }        
    let newReservation = new Reservation({
        user_id: user_id,
        study_room_infos: study_room_infos,
        day: day,
        from_hour: from_hour,
        to_hour: to_hour,
        creation_time: creation_time
    });
    saveReservation(newReservation, res);
};

exports.modifyReservation = (req, res) => {
    let id = req.params.reservationId;
    Reservation.findOne({_id: id}, (err, reservation) => {
        if (err) {
            return res.status(400).json({message: err});
        }
        reservation.day = req.body.day;
        reservation.from_hour = req.body.from_hour;
        reservation.to_hour = req.body.to_hour;
        saveReservation(reservation, res);
    });
};


exports.getReservation = (req, res) => {
    let user_id = req.user._id;
    getReservationFromUser(user_id, res);
};

exports.adminGetUserReservations = (req, res) => {
    let user_id = req.params.user_id;
    getReservationFromUser(user_id, res);
};

function getTimeAndDate() {
    let date = new Date();
    let hours = date.getHours();
    let minute = date.getMinutes();
    let time = hours + ":" + minute;
    let monthDay = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = monthDay + "-" + month + "-" + year;
    let fullDate = {time: time, day: day};
    return fullDate;
}

function saveReservation(newReservation, res) {
    //query con cui si ottengono solo le prenotazioni la cui ora di inizio e/o l'ora di fine sono comprese tra le ore di inizio e fine della nuova prenotazione
    // e quelle la cui ora di inizio è minore o uguale a quella di inizio della nuova prenotazione e la cui ora di fine è maggiore o uguale a quella di fine della nuova prenotazione
    Reservation.find({
        $and: [
            {day: newReservation.day},
            {study_room_infos: newReservation.study_room_infos},
            {$or:[{from_hour: {$gte: newReservation.from_hour, $lt: newReservation.to_hour}},
                  {to_hour: {$gt: newReservation.from_hour, $lte: newReservation.to_hour}},
                  {$and:[{from_hour: {$lte: newReservation.from_hour}},
                         {to_hour: {$gte: newReservation.to_hour}}
                        ]}
                ]}
            ]
    }, (err, reservations) => {
        if (err) {
            return res.status(400).send({message: err});
        }
        let from_hour = newReservation.from_hour;
        let to_hour = newReservation.to_hour;
        let total_hours = to_hour - from_hour;
        let reservations_in_hour = 0;
        StudyRoom.find({name: newReservation.study_room_infos.name, address: newReservation.study_room_infos.address}, (err, room) => {
            if (err) {
                return res.status(400).send({message: err});
            }
            let capacity = room[0].capacity;
            //per ogni intervallo di ore presente, si controlla quante delle prenotazioni ottenute esistono in quell'intervallo 
            for (let i = 0; i < total_hours; i++){
                reservations_in_hour = 0;
                if (reservations.length > 0) {
                    reservations.forEach((reservation) => {
                        if (reservation.from_hour <= from_hour + i && reservation.to_hour >= from_hour + i + 1) {
                            reservations_in_hour += 1;
                        }
                    });
                }
                //si controlla se sono ancora presenti posti disponibili nell'intervallo di ore corrente
                if (capacity - reservations_in_hour <= 0) {
                    return res.status(422).json({message: "L'aula selezionata non ha posti disponibili dalle ore " + from_hour + " alle ore " + (from_hour + 1)});                    
                }
            }
            //se si arriva al di fuori del ciclo non ci sono stati problemi, quindi si può salvare la prenotazione
            newReservation.save((err, reservation) => {
                if (err) {
                    return res.status(400).json({message: err});
                }
                return res.status(200).send(reservation);
            });
        });
    }); 
}

function deleteReservation(id, res) {
    Reservation.deleteOne({ _id: id }, (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.status(200).json({ message: 'Prenotazione eliminata correttamente'});
    });
}

function getReservationFromUser(user_id, res) {
    Reservation.find({user_id: user_id}, (err, reservations) => {
        if (err) {
            return res.status(400).json({message: err});
        }
        let reservationsToSend = [];
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        reservations.forEach((reservation) => {
            let resDay = parseInt(reservation.day.substring(0, reservation.day.indexOf('-')));
            let resMonth = parseInt(reservation.day.substring(reservation.day.indexOf('-') + 1, reservation.day.lastIndexOf('-')));
            let resYear = parseInt(reservation.day.substring(reservation.day.lastIndexOf('-') + 1, reservation.day.length));
            if ((resYear == year && resMonth == month && resDay == day && reservation.to_hour > hour) || (resYear > year) || (resYear == year && resMonth > month) || (resYear == year && resMonth == month && resDay > day)) {
                reservationsToSend.push(reservation);
            }
        });
        return res.status(200).json(reservationsToSend);
    });
}