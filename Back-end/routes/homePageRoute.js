const client = require("../db")
const express = require("express");
const {getHomePage,loadTask,addTask,checkTask,deleteTask,Logout} = require('../controllers/homePageController')
const isAuthenticated = require("../middleware/auth")

const Router = express.Router();

Router.get("/Task",isAuthenticated,getHomePage)
Router.get("/showTask",isAuthenticated,loadTask)
Router.post("/addTask",isAuthenticated,addTask)
Router.put("/checkTask/",isAuthenticated,checkTask)
Router.delete("/deleteTask/:task",isAuthenticated,deleteTask)
Router.post("/logout",Logout);


module.exports = Router;