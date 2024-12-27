const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
import users from "../db";

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(200).json({ message: "Success!!" });
});
