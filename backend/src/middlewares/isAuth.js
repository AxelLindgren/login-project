const express = require("express");
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  console.log("Authenticated User:", req.user);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Unauth.." });
  }
};

module.exports = isAuthenticated;
