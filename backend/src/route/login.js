const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
import users from "../db";

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Logged in!", user: req.user });
});
