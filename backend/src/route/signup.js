const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userQuery = "SELECT * FROM users WHERE username = $1";
    const checkQueryResult = await pool.query(userQuery, [username]);

    if (checkQueryResult.rows.length > 0) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUser = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING id, username
    `;
    const insertResult = await pool.query(insertUser, [username, hashedPassword]);

    res.status(200).json({ message: "Success!!", user: insertResult.rows[0] });
  } catch (err) {
    console.log("error signing up at signup.js: ", err);
    res
      .status(500)
      .json({ message: "error signing up at signup.js in backend" });
  }
});

router.options("/", (req, res) => {
  res.send("reached app.option")
})

module.exports = router;