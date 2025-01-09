const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuth");
const pool = require("../db");



router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { comment } = req.body;
    const userId = req.user.id;
    const query = `
      INSERT INTO comments (user_id, content)
      VALUES ($1, $2) RETURNING *
    `;
    const result = await pool.query(query, [userId, comment]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error posting comment:", err.message);
    res.status(500).json({ message: "Failed to post comment" });
  }
});

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const query = `
      SELECT content 
      FROM comments 
      WHERE user_id = $1 
      ORDER BY content DESC
    `;
    const result = await pool.query(query, [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching comments:", err.message);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

module.exports = router;
