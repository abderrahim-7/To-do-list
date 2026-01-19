const path = require("path");
const client = require("../db");
const bcrypt = require("bcrypt");

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
            const hashedPassword = await bcrypt.hash(password, 10);
            const Query = "INSERT INTO users VALUES ($1,$2)"
            const Values = [username,hashedPassword]
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