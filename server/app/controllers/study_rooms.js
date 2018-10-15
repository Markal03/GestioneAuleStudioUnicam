const mongoose = require('mongoose');
const StudyRoom = mongoose.model('Study Room');

exports.addStudyRoom = (req, res, next) => {
    var name = req.body.name;
    var capacity = req.body.capacity;
    if (!name) {
        res.status(422).send({ error: "Campo nome necessario" });
    }
    if (!capacity) {
        res.status(422).send({ error: "Campo capienza necessario" });
    }
    if (!days_open) {
        res.status(422).send({ error: "Inserisci giorni di apertura" });
    }
    if (!hours_open) {
        res.status(422).send({ error: "Inserisci orari di apertura" });
    }
    var description = !req.body.description ? "" : req.body.description;
    var image = !req.body.image ? "" : req.body.image;

    StudyRoom.findOne({ name: name }, (err, existingStudyRoom) => {
        if (err) {
            return next(err);
        }
        if (existingStudyRoom) {
            return res.status(422).send({error: 'Un aula studio che utilizza il nome inserito è già esistente'});
        }

        var newStudyRoom = new StudyRoom({
            name: name,
            capacity: capacity,
            days_open: days_open,
            hours_open: hours_open,
            description: description,
            image: image
        });

        newStudyRoom.save((err, studyRoom) => {
            if (err) {
                return next(err);
            }
            res.status(201).json(studyRoom);
        });

    });
    
};

