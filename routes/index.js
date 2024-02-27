// routes/index.js
const express = require('express');
const isAuthenticated = require('../authMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = req.session.user && req.session.user.role === "admin";

        res.render('index', { isAdmin: isAdmin, user: req.session.user });
    } catch (error) {
        console.error('Error determining admin status:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
