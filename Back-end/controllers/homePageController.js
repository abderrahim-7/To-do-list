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

const addTask = async (req, res) => {
    try {
        const username = req.session.user.username;
        const { taskName, taskStatus } = req.body;

        const regexPattern = `^${taskName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\([0-9]+\\))?$`; 

        const query1 = "SELECT COUNT(*) FROM task WHERE task ~ $1 AND username = $2";
        const values1 = [regexPattern, username];
        const result1 = await client.query(query1, values1);

        const n = parseInt(result1.rows[0].count);
        const suffix = n > 0 ? `(${n})` : '';
        const finalTaskName = taskName + suffix;

        const query2 = "INSERT INTO task (task, state, username) VALUES ($1, $2, $3)";
        await client.query(query2, [finalTaskName, taskStatus, username]);

        res.status(201).json({ 
            message: "Task added successfully",
            finalTaskName
        });
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ err: "Internal Server Error" });
    }
};


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