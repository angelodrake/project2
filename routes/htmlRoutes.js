var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get('/index.html', function (req, res) {
    res.render("add-patient")
  });


  //router for qr scanner
  app.get("/patients/:id", function(req, res) {
    db.Patient.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Doctor, db.Prescription]
    }).then(function (data) {
      var patientObj = {
        patient: data.dataValues
      }

      console.log(patientObj)

      res.render("patients", patientObj);
  })
})
}
