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
  // Get all doctors
  app.get("/api/doctors", function (req, res) {
    db.Doctor.findAll({}).then(function (data) {
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
   
    db.Patient.create({
      name: req.body.name,
      birthday: req.body.birthday,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email
    }).then(function (data) {
      res.json(data);
    });
  });

  // Create a new doctor
  app.post("/api/doctors", function (req, res) {
    
    db.Doctor.create({
      name: req.body.name,
      specialty: req.body.specialty,
      phone: req.body.phone,
      email: req.body.email,
      PatientId: req.body.PatientId
    }).then(function (data) {
      res.json(data);
    });
  });
};