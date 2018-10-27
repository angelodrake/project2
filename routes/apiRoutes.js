var db = require("../models");

module.exports = function(app) {
  // Get all patients
  app.get("/api/patients", function(req, res) {
    db.Patient.findAll({
      include: [db.Doctor]
    }).then(function(data) {
      res.json(data);
    });
  });

  // Create a new patient
  app.post("/api/patients", function(req, res) {
    db.Patient.create(req.body).then(function(data) {
      res.json(data);
    });
  });

};
