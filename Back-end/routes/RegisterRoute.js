const express = require("express");
const {getRegisterPage,Register} = require("../controllers/RegisterController")

const Router = express.Router();

Router.get("/register",getRegisterPage)
Router.post("/signUP",Register)

module.exports = Router;