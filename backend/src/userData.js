const express = require("express");
const router = express.Router();
const isAuthenticated = require("./middlewares/isAuth");
const pool = require("./db");

router.get("/data", async (req, res) => {
  try {
    const userId = req.user.id;
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [userId]);

    console.log("Database Result:", result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found when trying to access data." });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: `Error message: ${err}` });
  }
});

module.exports = router;
