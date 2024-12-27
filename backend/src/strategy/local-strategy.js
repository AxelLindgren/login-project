const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const users = require("../db");

export default passport.use(
  new LocalStrategy((username, password, done) => {
    try {
      const foundUser = users.find((u) => users.username === username);
      if (!foundUser) {
        throw new Error("User not found");
      }
      if (foundUser.password !== password) {
        throw new Error("wrong password");
      }
      done(null, foundUser);
    } catch (err) {
      done(err, null);
    }
  })
);

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  try {
    const findUser = users.find((user) => user.id === id);
    done(null, findUser);
  } catch (err) {
    done(err);
  }
});
