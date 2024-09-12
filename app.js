const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8080;

app.use(cors());

const API_KEY = process.env.GNEWS_KEY;
const BASE_URL = 'https://gnews.io/api/v4/search';

app.get('/api/news', async (req, res) => {
  const { page = 1, q = '' } = req.query;
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        token: API_KEY,
        q: q || 'latest', 
        page: page,
        country: 'in',
        lang: 'en',
      },
    });

    res.json({
      articles: response.data.articles,
    });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Failed to fetch news from GNews API.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});