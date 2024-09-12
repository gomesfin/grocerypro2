const express = require('express');
const axios = require('axios');
const router = express.Router();
const Item = require('../models/Item');

// Search items by name
router.get('/search', async (req, res) => {
  try {
    const query = req.query.name;
    const items = await Item.find({ name: new RegExp(query, 'i') });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// Search items by name (existing route)
router.get('/search', async (req, res) => {
  try {
    const query = req.query.name;
    const items = await Item.find({ name: new RegExp(query, 'i') });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch nutritional information from Nutritionix
router.get('/nutrition', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      headers: {
        'x-app-id': process.env.NUTRITIONIX_APP_ID,
        'x-app-key': process.env.NUTRITIONIX_API_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        query: query,
      },
    });

    const nutritionData = response.data.foods[0];
    res.json(nutritionData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching nutrition data' });
  }
});

module.exports = router;
