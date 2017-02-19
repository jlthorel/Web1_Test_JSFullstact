/******************************************
 *  Author : JL Thorel   
 *  Created On : Sun Feb 19 2017
 *******************************************/

module.exports.check = function (req, res) {


  // res.end("Checking login !!!");
  console.dir(req.query)

  if (!req.query.lg_username || !req.query.lg_password) {
    res.send("login failed");
  } else if (req.query.lg_username === "amy" || req.query.lg_password === "pwd") {
    // req.session.user = "amy";
    // req.session.admin = true;
    res.send("login success!");
  }
};