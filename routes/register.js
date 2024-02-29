// routes/register.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer');
const { default: axios } = require('axios');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://goodb5156:hFNzdN4gl8pOd3gi@cluster0.favfshb.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });



router.get('/', (req, res) => {
    res.render('register', { errorMessage: null }); 
});

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.render('login', { errorMessage: 'Passwords do not match'});
        }

        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('login', { errorMessage: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        // Create new user with hashed password
        const user = new User({ firstName, lastName, email, password: hashedPassword });

        await user.save();

        // pdf
        await sendEmailWithPDF(user.email);

        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});



async function sendEmailWithPDF(email) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'goodb5156@gmail.com',
                pass: 'ccbb evhn onge nvqg'
            }
        });

        const mailOptions = {
            from: 'goodb5156@gmail.com',
            to: email,
            subject: "Welcome to Final Project!",
            text: "You successfully created a new account",
        };

        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
}



module.exports = router;