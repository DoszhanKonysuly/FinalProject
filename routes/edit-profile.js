// routes/edit-profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for each uploaded file
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer upload
const upload = multer({ storage: storage }); // Accept up to 3 images with the field name 'pictures'

// Static file serving configuration
router.use(express.static('uploads'));

// GET route to render the edit profile page
router.get('/', (req, res) => {
    // Render the edit-profile.ejs file and pass the user data if available
    res.render('edit-profile', { user: req.session.user });
});

// POST route to handle updating the user's profile
router.post('/', upload.array('image', 3), async (req, res) => {
    try {
        const userId = req.session.user._id;
        const { firstName, lastName, email, password } = req.body;
        
        // Check if images are uploaded
        let pictures = [];
        if (req.files && req.files.length > 0) {
            // Loop through uploaded files and push their filenames to the pictures array
            for (const file of req.files) {
                pictures.push(file.filename);
            }
        }
        // Find the user by ID
        let user = await User.findById(userId);

        // Update user properties
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        if (password) {
            user.password = password;
        }
        user.pictures = pictures;
        user.updatedAt = Date.now(); // Update the updatedAt timestamp

        // Save the updated user
        await user.save();

        res.redirect('/'); // Redirect to the homepage or any other page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
