const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer','')

    if (!token) {
        return res.status(403).json({message: 'Authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }
};

router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({message: 'Welcome to the dashboard', user: req.user});
});

module.exports = router;