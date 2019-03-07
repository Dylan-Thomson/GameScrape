const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

const router = express.Router();
router.get('/pcgamer', (req, res) => {
  axios.get('https://www.pcgamer.com/news/').then((response) => {
    const $ = cheerio.load(response.data);
    $('.listingResult').each((i, element) => {
      const result = {};
      result.title = $(element).find('.article-name').text();
      result.link = $(element).find('a').attr('href');
      result.image = $(element).find('img').attr('data-src');

      // Select only the text directly inside of .synopsis
      result.summary = $(element).find('.synopsis').clone().children()
        .remove()
        .end()
        .text();

      result.source = 'PC Gamer';
      result.sourceLink = 'https://www.pcgamer.com/';
      console.log(result);
      db.Article.create(result).catch((err) => {
        console.log(err);
      });
    });
    res.redirect('/articles/pcgamer');
  });
});

router.get('/ign', (req, res) => {
  res.redirect('/articles/ign');
});

module.exports = router;
