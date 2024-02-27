// routes/login.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

// Connect to MongoDB
mongoose.connect('mongodb+srv://goodb5156:hFNzdN4gl8pOd3gi@cluster0.favfshb.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });




router.get('/', (req, res) => {
    res.render('login', { errorMessage: null });
});

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.render('login', { errorMessage: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
