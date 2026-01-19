const path = require("path");
const client = require("../db");
const bcrypt = require("bcrypt");

const getLoginPage = async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "Front-end", "Login.html"));
};

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const query = "SELECT * FROM users WHERE username = $1";
        const values = [username];

        const result = await client.query(query, values);

        if (result.rowCount === 0) {
            return res.json({ success: false });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false });
        }

        req.session.user = { username };
        res.json({ success: true });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getLoginPage,
    Login
};
