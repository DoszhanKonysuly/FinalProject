// routes/admin.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Render your admin.ejs file
    res.render('admin', { user: req.session.user }); // Pass user data if available
});

module.exports = router;
