const express = require("express")
const session = require("express-session")
const path = require("path")
const client = require("./db")
const taskRoute = require("./routes/homePageRoute")
const loginRoute = require("./routes/loginRoute")
const registerRoute = require("./routes/RegisterRoute")

const app = express()
app.use(session({
    secret : "Abderrahim Ben Ali",
    resave : false,
    saveUninitialized : false,
    cookie: { secure: false }
}))

const port = 3000

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "Front-end"))); 

app.use(loginRoute) 
app.use(taskRoute)
app.use(registerRoute)


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});