const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const compression = require('compression');
const session = require("express-session");
const login_rtr = require("./route/login_rtr");

const app = express();

function pad(num) {
  return (num > 9 ? "" : "0") + num;
}


function generator(time, index) {
  console.log(arguments);

  if (!time)
    time = new Date();

  if (!index)
    index = 1;

  // return path.join(__dirname, "/log/access.log");

  console.log(time);
  var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
  var day = pad(time.getDate());
  var hour = pad(time.getHours());
  var minute = pad(time.getMinutes());

  console.log(__dirname + "/log/" + month + day + "/access-" + hour + minute + "-" + index + ".log");
  return __dirname + "/log/" + month + day + "/access-" + hour + minute + "-" + index + ".log";
}


// create a rotating write stream
var accessLogStream = rfs(generator, {

  rotationTime: true,
  interval: "15m",
  size: "10M",
  compress: true
});

//console.dir(accessLogStream);

// setup the logger
app.use(morgan("combined", {
  stream: accessLogStream
}));

// favicon
app.use(favicon(__dirname + "/images/favicon.ico"));

// compression
app.use(compression());


// session
app.use(session({
  secret: "2C44-4D44-WppQ38S",
  resave: true,
  saveUninitialized: true
}));

app.use("/login", login_rtr);

app.use("/run", function (req, res, next) {

  res.end("Hello page Run ? !!!");
});

app.use("/client/login.css", function (req, res, next) {
  res.sendFile(path.resolve(__dirname + "/../client/login.css"));
});
app.use("/", function (req, res, next) {
  res.sendFile(path.resolve(__dirname + "/../client/login.html"));
});
// 404
app.use("", function (req, res, next) {
  console.log("dans use 404");
  res.statusCode = 404;
  res.json({
    message: "not Found"
  });
});


app.listen(8080, function () {
  console.log("Serveur web lancé sur localhost:8080 ...");
});