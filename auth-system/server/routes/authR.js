const express = require('express');
const router = express.Router();
const User = require('../Model/UserSchema');

router.get('/register', (req,res) => {
    res.sendFile('register.html', {root: './public'});
});

router.post('/register', async (req,res) => {
    try{
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        await user.save();
        res.redirect('/');
    } catch(err) {
        res.status(400).send('Unable to register');
    }
});


router.get('/login', (req,res) => {
    res.sendFile('login.html', {root: './public'});
});

router.post('/login', async (req,res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        if (!user || !(await user.comparePassword(req.body.password))) {
            return res.redirect('/authR/login?error=Invalid username or password');
        }

        req.session.userId = user._id;
        res.redirect('/Dashboard');
    } catch (err) {
        res.status(400).send('Unable to login');
    }
});

router.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Unable to logout');
        }
        res.redirect('/authR/login');
    });
});

module.exports =  router;