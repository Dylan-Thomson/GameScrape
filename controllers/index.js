const express = require('express');

const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.Article.find({}).sort({ createdAt: -1 }).then((dbArticle) => {
    console.log(dbArticle);
    res.render('index', { articles: dbArticle });
  });
});

module.exports = router;
