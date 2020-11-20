var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const { v4: uuidV4 } = require("uuid");
var bodyParser = require("body-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
var http = require("http").createServer(app);
var io = require("socket.io")(http);
require("./passport");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://alex:bubblegum76@rtca.jff2l.mongodb.net/RTCA?retryWrites=true&w=majority";
const SECRET = "BFNdfsafdOBUJla253nmdsa455vndf";

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var usersRouter = require("./routes/users");
var testAPIRouter = require("./routes/testAPI");
var messageRouter = require("./routes/messages");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    genid: (req) => {
      console.log("Inside the session middleware");
      console.log(req.sessionID);
      return uuidV4(); // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.log("Connection Error:" + error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/messages", messageRouter);

app.get("/authrequired", (req, res) => {
  console.log("Inside GET /authrequired callback");
  console.log(`User authenticated? ${req.isAuthenticated()}`);
  if (req.isAuthenticated()) {
    res.json({ message: "You hit the authentication endpoint." });
  } else {
    res.json({ message: "Unsuccessful. Need to login." });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
