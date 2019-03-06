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
      result.summary = $(element).find('.synopsis').text();
      result.source = 'pcgamer';
      console.log(result);
      db.Article.create(result).then((dbArticle) => {
        console.log(dbArticle);
      }).catch((err) => {
        console.log(err);
      });
    });
  });
  res.redirect('/');
});

module.exports = router;
