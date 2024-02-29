const express = require('express');
const router = express.Router();
const axios = require('axios');
const isAuthenticated = require('../authMiddleware');

router.get('/', isAuthenticated, (req, res) => {
    const isAdmin = req.session.user && req.session.user.role === "admin";
    const planetOrder = req.query.order;
    res.render('planets', { planetData: null, isAdmin: isAdmin, user: req.session.user, planetOrder: planetOrder }); 
});
router.get('/api/:planetId', async (req, res) => {
    const planetId = req.params.planetId;

    try {
        const response = await axios.get(`https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/${planetId}`, {
            headers: {
                'X-RapidAPI-Key': '9fb13699fbmshd4fd5deb96277d2p1a213bjsn1cd7bfc0f22a',
                'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
            }
        });
        

        
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Failed to fetch data. Please try again later.');
    }
});

module.exports = router;
