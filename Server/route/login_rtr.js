/*****************************************
 *  Author : JL Thorel   
 *  Created On : Sun Feb 19 2017
 *******************************************/

const Router = require("express").Router;
const login_ctrl = require("../controller/login_ctrl");

const routes = new Router();

routes.all("/", login_ctrl.check);

module.exports = routes;