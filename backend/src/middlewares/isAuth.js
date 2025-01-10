const express = require("express");
const router = express.Router();
// const passport = require("../strategy/local-strategy")

const isAuthenticated = (req, res, next) => {
  console.log("Session:", req.session);
  console.log("Passport user:", req.session.passport);
  console.log("User:", req.user);
  

  if (req.isAuthenticated()) {
    console.log("User is authenticated in isAuthenticated");

    next();
  } else {
    console.log("User is not authenticated in isAuthenticated");

    res.status(401).json({ message: "Unauth.." });
  }
};

module.exports = isAuthenticated;
