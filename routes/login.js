// routes/login.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

// Connect to MongoDB
mongoose.connect('mongodb+srv://goodb5156:hFNzdN4gl8pOd3gi@cluster0.favfshb.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });




router.get('/', (req, res) => {
    res.render('login', { errorMessage: null });
});

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('login', { errorMessage: 'Invalid email or password' });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            await sendEmailWithPDF(user.email);
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



async function sendEmailWithPDF(email) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'goodb5156@gmail.com',
                pass: 'ccbb evhn onge nvqg'
            }
        });

        const currentTime = new Date().toLocaleString(); 
        const mailOptions = {
            from: 'goodb5156@gmail.com',
            to: email,
            subject: "Login Information for Final Project",
            text: `You successfully logged in to your account on ${currentTime}.`
        };

        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
}



module.exports = router;
