const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require('../db');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const query = "SELECT * FROM users WHERE username = $1";
      const { rows } = await pool.query(query, [username]);
      console.log("query result", rows);

      if (rows.length === 0) {
        console.log("user not found", username)
        return done(null, false, { message: "User not found" });
      }

      const user = rows[0];

      const isValid = await bcrypt.compare(password, user.password);
      console.log("password validation", isValid);
      if (!isValid) {
        return done(null, false, { message: "Incorrect password" });
      }
      console.log("auth succ", user.username);
      return done(null, user);
    } catch (err) {
      console.error("error during auth", err);
      return done(err);
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

passport.deserializeUser(async (id, done) => {
  try {
    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return done(new Error("User not found"));
    }

    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;