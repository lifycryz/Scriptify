// In routes/mainRoute.js
const express = require('express');
const router = express.Router();
const isAuthenticated = require("../config/isAuthenticated")

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard")
  }
  res.render("login")
});
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', {
    users: req.user
  });
});
router.get('/dash', isAuthenticated, (req, res) => {
  res.render('dash');
});

module.exports = router;
