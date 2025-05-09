const {Client} = require("pg");

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: "postgres",
    password: "root",
    database: "ToDoList"
});

client.connect()
.then(() => console.log('Connected to PostgreSQL'))
.catch((err) => console.error('Connection error', err.stack));

module.exports = client;