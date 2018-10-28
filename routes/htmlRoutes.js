var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get('/index.html', function (req, res) {
    res.render("add-patient")
  });
};
