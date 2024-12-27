const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
import LoginPath from "../../frontend/src/components/login";
import SignUpPath from "../../frontend/src/components/signup";
import AuthenticatePath from "../../frontend/src/components/authenticate";
const LocalStrategyPath = require("./strategy/local-strategy");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_PORT,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/login", LoginPath);
app.use("/signup", SignUpPath);
app.use("/authenticate", AuthenticatePath);

app.get("/", (req, res) => {
  res.render("Root reached");
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

app.get("/api/auth/status", (req, res) => {
  console.log(req.user);
});
