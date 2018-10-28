var db = require("../models");

module.exports = function (app) {
  // Get all patients
  app.get("/api/patients", function (req, res) {
    db.Patient.findAll({
      include: [db.Doctor, db.Perscription]
    }).then(function (data) {
      res.json(data);
    });
  });

  //get single patient
  app.get("/api/patients/:id", function (req, res) {

    db.Patient.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Doctor, db.Perscription]
    }).then(function (data) {
      res.json(data);
    });
  });

  // Create a new patient
  app.post("/api/patients", function (req, res) {
    db.Patient.create(req.body).then(function (data) {
      res.json(data);
    });
  });

};