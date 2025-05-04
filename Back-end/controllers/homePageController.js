const path = require("path")
const client = require("../db")


const getHomePage = (req,res) => {
    res.sendFile(path.join(__dirname,"..","..","Front-end","HomePage.html"))
}

const loadTask = async (req,res) => {
        try{
            const username = req.session.user.username
            const result = await client.query("select * from task where username = $1;",[username])
            res.json(result.rows)
        }
        catch(err){
            console.log("error fetching data",err)
            res.status(500).json({err : "Internal Server Error"})
        }
}

const addTask = async (req,res) => {
    try{
        const username = req.session.user.username
        const {taskName,taskStatus} = req.body
        const Query = "Insert into task (task,state,username) values ($1,$2,$3);"
        const Values = [taskName,taskStatus,username]
        const result = await client.query(Query, Values);

        res.status(201).json({message : "Task added successfully"})
    }
    catch(err){
        console.error("Database Error:", err);  
        res.status(500).json({err : "Internal Server Error"})
    }
}

const checkTask = async (req,res) => {
    try{
        const username = req.session.user.username
        const {task} = req.body
        const Query = "Update task set state = NOT state where task = $1 and username = $2"
        const result = await client.query(Query,[task,username])

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ message: "Task modified successfully", ModifiedTask: result.rows[0] });
    }
    catch(err){
        console.log('database error',err)
        res.status(500).json({message : "Internal Server Error"})
    }
}

const deleteTask = async (req,res) => {
    try{
        const username = req.session.user.username
        const taskName = req.params.task
        const Query = "DELETE FROM task WHERE task = $1 and username = $2";
        const Values = [taskName,username]
 
        const result = await client.query(Query,Values)
        console.log("Deleted Rows:", result.rowCount);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully", deletedTask: result.rows[0] });
    }
    catch(err){
        console.error("Database Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const Logout = async (req,res) => {
    req.session.destroy(() => {
        res.json({ success: true, message: "Logged out" });
    });
}

module.exports = {
    getHomePage,
    loadTask,
    addTask,
    checkTask,
    deleteTask,
    Logout
}