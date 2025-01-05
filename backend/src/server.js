const express = require("express");
require("dotenv").config();
const app = express();
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./strategy/local-strategy");

const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET || "default_secret";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(
  session({
    secret: SESSION_SECRET,
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

// console.log(process.env.CORS_ORIGIN);
// console.log(process.env.SESSION_SECRET);
// console.log(process.env.PORT);

app.get("/", (req, res) => {
  res.status(201).json({ message: "Root reached" });
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Auth success" });
});

const LoginPath = require("./route/login");
const LogoutPath = require("./route/logout");
const SignUpPath = require("./route/signup");
const userDataPath = require("./userData");
const commentPath = require("./route/comment");

app.use("/login", LoginPath);
app.use("/logout", LogoutPath);
app.use("/signup", SignUpPath);
app.use("/user", userDataPath);
app.use("/comment", commentPath);
app.use((req, _res, next) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running and listening to ${PORT}`);
});

module.exports = app;
