// routes/edit-profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET route to render the edit profile page
router.get('/', (req, res) => {
    // Render the edit-profile.ejs file and pass the user data if available
    res.render('edit-profile', { user: req.session.user });
});

// POST route to handle updating the user's profile
router.post('/', async (req, res) => {
    try {
        const userId = req.session.user._id;
        const { firstName, lastName, email, password } = req.body;
        
        // Find the user by ID
        let user = await User.findById(userId);

        // Update user properties
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        if (password) {
            user.password = password;
        }
        user.updatedAt = Date.now(); // Update the updatedAt timestamp

        // Save the updated user
        await user.save();

        // Clear the session data
        req.session.user = null;

        res.redirect('/'); // Redirect to the homepage or any other page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
