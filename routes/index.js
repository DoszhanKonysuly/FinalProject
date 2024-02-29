// routes/index.js
const express = require('express');
const isAuthenticated = require('../authMiddleware');
const router = express.Router();
const MainPage = require('../models/mainPage'); 

router.get('/', isAuthenticated, async (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = req.session.user && req.session.user.role === "admin";

        const mainPageContent = await MainPage.findOne();
        
        res.render('index', { isAdmin: isAdmin, user: req.session.user, mainPageContent: mainPageContent });
    } catch (error) {
        console.error('Error determining admin status:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;