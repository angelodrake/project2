var authController = require("../controllers/authcontroller.js");
var db = require("../models");
 
module.exports = function(app, passport) {
 
    app.get("/signup", authController.signup);

    app.get("/signin", authController.signin);

    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/dashboard",
 
        failureRedirect: "/signin"
    }
 
    ));

    app.get("/logout",authController.logout);

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/dashboard",
 
        failureRedirect: "/signup"

    }))

    //authentication check function
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect("/signin");
     
    }
    //when the dashboard is accessed perform authentication check
    app.get("/dashboard", isLoggedIn, authController.dashboard);

    //router for qr scanner
  app.get("/patients/:id", isLoggedIn, function(req, res) {
    db.Patient.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Doctor, db.Prescription, db.Insurance]
    }).then(function (data) {
      var patientObj = {
        patient: data.dataValues
      }
      res.render("patients", patientObj);
  })
})

app.get('/analytics', isLoggedIn, function (req, res) {
  res.render("analytics")
});
}