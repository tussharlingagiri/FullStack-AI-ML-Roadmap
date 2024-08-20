const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const mongoose = require('mongoose');



router.get('/operat', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/operat', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/operat/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.title = req.body.title;
        task.description = req.body.description;
        task.status = req.body.status;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/operat/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.patch('/operat/:id/status', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.status = 'completed';
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;