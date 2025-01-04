const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "loginDB",
  password: process.env.DB_PASSWORD || "Ixix7991",
  port: process.env.DB_PORT || 5432,
  ssl: false,
  // {
  //   rejectUnauthorized: false,
  // },
});

// const users = [];


pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Success:", res.rows[0]);
  }
});

module.exports = pool;