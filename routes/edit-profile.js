// routes/edit-profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    const isAdmin = req.session.user && req.session.user.role === "admin";

    res.render('edit-profile', { isAdmin: isAdmin, user: req.session.user });
});

router.post('/', async (req, res) => {
    try {
        const userId = req.session.user._id;
        const { firstName, lastName, email, password } = req.body;
        
        let user = await User.findById(userId);
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10); 
            user.password = hashedPassword;
        }

        user.updatedAt = Date.now(); 
        await user.save();

        req.session.user = null;

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
