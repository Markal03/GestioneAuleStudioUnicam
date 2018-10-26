const mongoose = require('mongoose');
const Reservation = require('../models/reservation');

//TODO
/*exports.adminDeleteReservation = (req, res) => {
    
};*/

exports.deleteReservation = (req, res) => {
    let user_id = req.user.user_id;
    deleteReservation(user_id);
};

exports.addReservation = (req, res) => {
    let user_id = req.user._id;
    let study_room_id = req.body.study_room_id;
    let day = req.body.day;
    let from_hour = req.body.from_hour;
    let to_hour = req.body.to_hour;
    if (!user_id) {
        res.status(422).json({ error: 'Id utente mancante' });
    }
    if (!study_room_id) {
        res.status(422).json({ error: 'Id aula studio mancante' });
    }
    if (!day) {
        res.status(422).json({ error: 'Giorno mancante' });
    }
    if (!from_hour) {
        res.status(422).json({ error: 'Ora inizio prenotazione mancante' });
    }
    if (!to_hour) {
        res.status(422).json({ error: 'Ora fine prenotazione mancante' });
    }
    Reservation.findOne({user_id: user_id}, (err, existingReservation) => {
        if (err) {
            return res.status(400).json({error: err});
        }
        if (existingReservation) {
            return res.status(400).json({error: "L'utente ha già una prenotazione"});
        }
        let newReservation = new Reservation({
            user_id: user_id,
            study_room_id: study_room_id,
            day: day,
            from_hour: from_hour,
            to_hour: to_hour
        });
        newReservation.save((err, reservation) => {
            if (err) {
                return res.status(400).json({error: err});
            }
            return res.status(200).send(reservation);
        });
    });
};

exports.modifyReservation = (req, res) => {
    let user_id = req.user._id;
    Reservation.findOne({user_id: user_id}, (err, reservation) => {
        if (err) {
            return res.status(400).json({error: err});
        }
        reservation.day = req.body.day;
        reservation.from_hour = req.body.from_hour;
        reservation.to_hour = req.body.to_hour;
        if (!checkReservationValidity(reservation)) {
            return res.status(400).json({error: 'Non è possibile modificare la prenotazione'});
        }
        reservation.save((err, reservation) => {
            if (err) {
                return res.status(400).json({error: err});
            }
            return res.status(200).json({ message: 'Prenotazione modificata correttamente'});
        });
    });
};

exports.getReservation = (req, res) => {
    let user_id = req.user._id;
    Reservation.findOne({user_id: user_id}, (err, reservation) => {
        if (err) {
            return res.status(400).json({error: err});
        }
        return res.status(200).json(reservation);
    });
};

function checkReservationValidity(newReservation) {
    //TODO
    return true;
}

function deleteReservation(user_id) {
    Reservation.deleteOne({ user_id: user_id }, (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json({ message: 'Prenotazione eliminata correttamente'});
    });
}