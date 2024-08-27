const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User_model');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('User already exists');
        }

        // Create a new user
        user = new User({ username, password });
        await user.save();

        console.log('User ID:', user._id); // Debugging log

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '2h' });

        // Send the token in the response
        res.json({ token });
    } catch (error) {
        console.error('Error during registration:', error); // Debugging log
        res.status(500).json({ message: 'Server Error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password incorrect' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '2h' });

        // Send the token in the response
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error); // Debugging log
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;