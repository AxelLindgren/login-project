const express = require("express");
require("dotenv").config();
const app = express();
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./strategy/local-strategy");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
      httpOnly: true, 
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const LoginPath = require("./route/login");
const LogoutPath = require("./route/logout");
const SignUpPath = require("./route/signup");



app.use("/login", LoginPath);
app.use("/logout", LogoutPath);
app.use("/signup", SignUpPath);


app.get("/", (req, res) => {
  res.status(201).json({ message: "Root reached" });
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Auth success" });
});

app.get("/amanda", (req, res) => {
  res.status(201).json({ message: "I FOUND HER AMAGAHD" });
});

app.listen(PORT, () => {
  console.log(`Server running and listening to ${PORT}`);
});

module.exports = app;
