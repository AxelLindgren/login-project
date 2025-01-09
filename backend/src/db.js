const { Pool } = require("pg");
require("dotenv").config( );

const pool = new Pool({
  user: process.env.DB_USER || "postgres1",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "logindb",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  // ssl: false,
  ssl: {
    rejectUnauthorized: true,
  },
});

// const users = [];

// console.log(process.env.DB_HOST);
// console.log(process.env.DB_PORT);
// console.log(process.env.DB_PASSWORD);


pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Success:", res.rows[0]);
    
  }
});

module.exports = pool;