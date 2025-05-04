const express = require("express");
const {getLoginPage,Login} = require('../controllers/LoginController')

const Router = express.Router();

Router.get("/",getLoginPage)
Router.post("/login",Login)


module.exports = Router