// routes/admin.js

const express = require('express');
const router = express.Router();
const MainPage = require('../models/mainPage');

// GET route to render the admin page with main page editing functionality
router.get('/', async (req, res) => {
    try {
        const mainPageContent = await MainPage.findOne();
        console.log(mainPageContent); // Check the retrieved main page content
        res.render('admin', { mainPageContent });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        // Fetch the current main page content from the database
        let mainPageContent = await MainPage.findOne();
        if (!mainPageContent) {
            // Create new main page content if it doesn't exist
            mainPageContent = new MainPage(req.body);
        } else {
            // Update existing main page content
            mainPageContent.set(req.body);
        }
        // Save the updated main page content to the database
        await mainPageContent.save();
        res.redirect('/'); // Redirect to the main page or any other page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
