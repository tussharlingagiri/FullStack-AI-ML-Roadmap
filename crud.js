const express = require('express');
const connectDB = require('./mongo');
const Task = require('./model');

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());

// Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a task by ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a task by ID
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');

        task.title = req.body.title;
        task.description = req.body.description;
        task.status = req.body.status;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');

        await task.remove();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});