const express = require("express");
require("dotenv").config();
const app = express();
const session = require("express-session");
const passport = require("./strategy/local-strategy");
const cors = require("cors");
// require("./strategy/local-strategy");
// const https = require('https');
// const fs = require('fs');

const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET || "default_secret";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// Trust Proxy

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
      secure: true,
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(201).json({ message: "Root reached" });
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  console.log("Authenticated user:", req.user);
  console.log("Session after login:", req.session);
  res.status(200).json({ message: "Login successful", user: req.user });
});

const LoginPath = require("./route/login");
const LogoutPath = require("./route/logout");
const SignUpPath = require("./route/signup");
const userDataPath = require("./userData");
const commentPath = require("./route/comment");
const isAuthenticated = require("./middlewares/isAuth");

app.use("/login", LoginPath);
app.use("/logout", LogoutPath);
app.use("/signup", SignUpPath);
app.use("/user", userDataPath);
app.use("/comment", commentPath);
app.use((req, _res, next) => {
  console.log("Session:", req.session);
  console.log("Session ID:", req.sessionID);
  console.log("User:", req.user);
  next();
});
app.set('trust proxy', 1); 



app.get("/health-check", (req, res) => {
  if (req.session) {
    if (!req.session.test) req.session.test = "Session is working!";
    res.status(200).send(`Session working, message: ${req.session.test}`);
  } else {
    res.status(500).send("Session not working");
  }
});

app.post("/protected", isAuthenticated, (req, res) => {
  console.log("Authenticated user:", req.user);
  res.status(200).json({ message: "isAuthenticated success" });
});

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem'),
// };

// https.createServer(options, app).listen(5000, () => {
//   console.log('HTTPS server running at https://localhost');
// });

app.listen(PORT, () => {
  console.log(`Server running and listening to ${PORT}`);
});


module.exports = app;
