import express from "express";

const app = express();
app.use(express.json());

let tasks = [
    {id: 1, taskName: "Login Page", assignedTo: "Rahul", status: "Pending", priority: "High"},
    {id: 2, taskName: "Dashboard", assignedTo: "Amit", status: "Completed", priority: "Medium"},
    {id: 3, taskName: "Website", assignedTo: "Ashwani", status: "Pending", priority: "High"}
];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
    let task = tasks.find(t => t.id == req.params.id);
    if (!task) return res.status(404).json({message: "Task not found"});
    res.json(task);
});

app.post("/tasks", (req, res) => {
    tasks.push(req.body);
    res.status(201).json({message: "Task added successfully", task: req.body});
});

app.put("/tasks/:id", (req, res) => {
    let task = tasks.find(t => t.id == req.params.id);
    if (!task) return res.status(404).json({message: "Task not found"});
    Object.assign(task, req.body);
    res.json({message: "Task updated", task});
});

app.delete("/tasks/:id", (req, res) => {
    let old = tasks.length;
    tasks = tasks.filter(t => t.id != req.params.id);
    if (old == tasks.length) return res.status(404).json({message: "Task not found"});
    res.json({message: "Task deleted successfully"});
});

app.listen(4000, () => {
    console.log("Express Server running at http://localhost:4000");
});