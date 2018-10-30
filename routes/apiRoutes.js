var db = require("../models");
var fs = require("fs")
var path = require("path")

module.exports = function (app) {
  // Get all patients
  app.get("/api/patients", function (req, res) {
    db.Patient.findAll({
      include: [db.Doctor, db.Prescription, db.Insurance]
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
  // Get all barchart data
  app.get("/api/analytics", function (req, res) {
      fs.readFile(path.join(__dirname, "../public/data/barchart.tsv"), function(err,data) {
        if (err) throw err;
        res.send(data)
      })
    });

  //get single patient
  app.get("/api/patients/:id", function (req, res) {

    db.Patient.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Doctor, db.Prescription, db.Insurance]
    }).then(function (data) {
      res.json(data);
    });
  });

  // Create a new patient
  app.post("/api/patients", function (req, res) {
    console.log(req.body)
    db.Patient.create({
      name: req.body.name,
      birthday: req.body.birthday,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      bloodType: req.body.bloodType,
      emergencyContact: req.body.emergencyContact,
      contactPhone: req.body.contactPhone
    }).then(function (data) {
      res.json(data);
    });
  });

  //update patient
  app.put("/api/patients", function(req, res) {
    
    db.Patient.update({
      name: req.body.name,
      birthday: req.body.birthday,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      bloodType: req.body.bloodType,
      emergencyContact: req.body.emergencyContact,
      contactPhone: req.body.contactPhone},
      {
        where: {
          id: req.body.id
        }
    }).then(function(dbPatient) {
      res.json(dbPatient);
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
