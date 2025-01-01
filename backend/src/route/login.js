const express = require("express");
const session = require("express-session");
const passport = require("passport");
const router = express.Router();

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Error logging in" });
    }
    if (!user) {
      return res.status(400).json({ message: info.message || "Login failed" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging in" });
      }
      return res.json({ message: "Logged in!", user: { id: user.id, username: user.username } });
    });
  })(req, res, next);
});

module.exports = router;