const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.json(newTask);
});

// PATCH task (toggle complete)
app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.map((task) =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  res.json({ message: "Task updated" });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  res.json({ message: "Task deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});