const path = require("path")
const client = require("../db")

const getLoginPage = async (req,res) => {
    res.sendFile(path.join(__dirname,"..","..","Front-end","Login.html"))
}

const Login = async (req,res) => {
    try{
        const {username,password} = req.body;
        const Query = "select * from users where username = $1 and password = $2"
        const Values = [username,password]
        const result = await client.query(Query,Values);
        if (result.rowCount == 0){
            res.json({success : false});
        }
        else{
            req.session.user = {username}
            res.json({success : true});
        }
    }
    catch(error){
        console.error("Database Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getLoginPage,
    Login
}