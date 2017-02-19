const path = require("path");
const express = require("express");
const session = require('express-session');
const login_rtr = require("./route/login_rtr");

const app = express();

app.use(session({
  secret: '2C44-4D44-WppQ38S',
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