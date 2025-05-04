const path = require("path");
const client = require("../db");

const getRegisterPage = async (req,res) => {
    res.sendFile(path.join(__dirname,"..","..","Front-end","Register.html"))
}

const Register = async (req,res) => {
    try{
        const {username,password} = req.body
        if (username.trim().length === 0 || password.trim().length===0){
            res.json({success : false, reason : 'username or password is invalid'})
        }
        else{
            const Query = "INSERT INTO users VALUES ($1,$2)"
            const Values = [username,password]
            await client.query(Query,Values)

            req.session.user = {username}
            res.json({success : true, reason : "None"})
        }
    }
    catch(error){
        res.json({success : false, reason : 'username already taken'})
    }
}

module.exports = {
    getRegisterPage,
    Register
}