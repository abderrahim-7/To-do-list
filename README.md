# 📝 To-Do List Web App

## 📌 Description

A simple **to-do list web application** that allows users to manage their tasks efficiently.  
Users can **create an account, log in, add tasks, mark them as completed, and delete them**.  
The application uses **session-based authentication** and **hashed passwords** for better security.

This project was built as my **first full-stack web application**.

---

## ✨ Features

- 🔐 **User authentication** (Sign up / Log in)
- 📝 **Create tasks**
- ✅ **Mark tasks as completed**
- 🗑️ **Delete tasks**
- 👤 Tasks are **user-specific**

---

## 🛠️ Tech Stack

### Frontend

- 🌐 HTML
- 🎨 CSS
- ⚙️ JavaScript

### Backend

- 🟢 Node.js
- 🚀 Express.js

### Database

- 🐘 PostgreSQL

### Authentication

- 🍪 Session-based authentication
- 🔒 Password hashing

---

## 📸 Screenshots

### 🔐 Authentication

![Login](Capture%20d'écran%202026-01-19%20214506.png)
![Register](Capture%20d'écran%202026-01-19%20214454.png)

### ➕ Creating a Task

![Add Task](Capture%20d'écran%202026-01-19%20214529.png)
![Task Added](Capture%20d'écran%202026-01-19%20214541.png)

### ✅ Marking Tasks as Done

![Task Done](Capture%20d'écran%202026-01-19%20214607.png)
![Task Done 2](Capture%20d'écran%202026-01-19%20214619.png)

### 🗑️ Deleting a Task

![Delete Task](Capture%20d'écran%202026-01-19%20214630.png)
![Task Deleted](Capture%20d'écran%202026-01-19%20214638.png)

---

## ⚙️ Installation & Setup

### 📂 Database

Create a **PostgreSQL database** with two tables:

**users**

- `username`
- `password`

**task**

- `task` (task name)
- `state` (boolean: `true` = done, `false` = not done)
- `username` (foreign key)

---

### ▶️ Run the project

```bash
npm install
node index.js
```

Then open your browser at:

```bash
http://localhost:3000
```

---

### 🔐 Environment Variables

Create a .env file based on .env.example and add your configuration variables.

---

### 👤 Author

Abdrahim Benali
Software Engineering Student at INPT
