// routes/words.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const isAuthenticated = require('../authMiddleware');

router.get('/', isAuthenticated, (req, res) => {
    const isAdmin = req.session.user && req.session.user.role === "admin";
    res.render('words', { wordData: null, isAdmin: isAdmin, user: req.session.user }); // Render the words.ejs template with null data
});

router.get('/api/:word', async (req, res) => {
    const word = req.params.word;

    try {
        const response = await axios.get('https://wordsapiv1.p.rapidapi.com/words/' + word, {
            headers: {
                'X-RapidAPI-Key': '9fb13699fbmshd4fd5deb96277d2p1a213bjsn1cd7bfc0f22a',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        });
        
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Failed to fetch data. Please try again later.');
    }
});

module.exports = router;
