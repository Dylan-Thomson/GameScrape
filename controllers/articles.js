const express = require('express');

const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.Article.find({}).sort({ createdAt: -1 }).then((dbArticle) => {
    res.render('articles', { articles: dbArticle });
  });
});
router.get('/pcgamer', (req, res) => {
  db.Article.find({ source: 'PC Gamer' }).sort({ createdAt: -1 }).then((dbArticle) => {
    res.render('articles', { articles: dbArticle });
  });
});
router.get('/ign', (req, res) => {
  db.Article.find({ source: 'IGN' }).sort({ createdAt: -1 }).then((dbArticle) => {
    res.render('articles', { articles: dbArticle });
  });
});
router.get('/gamespot', (req, res) => {
  db.Article.find({ source: 'GameSpot' }).sort({ createdAt: -1 }).then((dbArticle) => {
    res.render('articles', { articles: dbArticle });
  });
});

module.exports = router;
