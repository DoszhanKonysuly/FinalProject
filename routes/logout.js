// routes/logout.js
const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Server Error');
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;
