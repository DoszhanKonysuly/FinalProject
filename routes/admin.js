// routes/admin.js

const express = require('express');
const router = express.Router();
const MainPage = require('../models/mainPage');

router.get('/', async (req, res) => {
    try {
        const isAdmin = req.session.user && req.session.user.role === "admin";
        const mainPageContent = await MainPage.findOne();
        res.render('admin', { mainPageContent, isAdmin: isAdmin, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        let mainPageContent = await MainPage.findOne();
        if (!mainPageContent) {
            mainPageContent = new MainPage(req.body);
        } else {
            mainPageContent.set(req.body);
        }
        await mainPageContent.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
