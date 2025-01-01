const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Logged out!" });
  });
});


module.exports = router;