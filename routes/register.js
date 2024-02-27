// routes/register.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb+srv://goodb5156:hFNzdN4gl8pOd3gi@cluster0.favfshb.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });



router.get('/', (req, res) => {
    res.render('register', { errorMessage: null }); // Pass null initially
});

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        // Create new user
        const user = new User({ firstName, lastName, email, password });

        await user.save();
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
