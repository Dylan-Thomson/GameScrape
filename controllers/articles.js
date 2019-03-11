const express = require('express');

const router = express.Router();
const db = require('../models');

function getPage(req, res, source) {
  const perPage = 10;
  const page = Math.max(1, req.param('pageNum'));
  const query = {};
  if (source) {
    query.source = source;
  }
  // eslint-disable-next-line max-len
  db.Article.find(query).limit(Number(perPage)).skip(perPage * page - perPage).sort({ createdAt: -1 })
    .then((dbArticle) => {
      db.Article.count(query).then((count) => {
        res.render('articles', {
          articles: dbArticle,
          prev: Number(page - 1),
          page,
          next: Number(page + 1),
          pages: Math.ceil(count / perPage),
        });
      });
    });
}

router.get('/', (req, res) => {
  res.redirect('/articles/page/1');
});

router.get('/page/:pageNum', (req, res) => {
  getPage(req, res);
});

router.get('/pcgamer', (req, res) => {
  res.redirect('/articles/pcgamer/page/1');
});

router.get('/pcgamer/page/:pageNum', (req, res) => {
  getPage(req, res, 'PC Gamer');
});

router.get('/ign', (req, res) => {
  res.redirect('/articles/ign/page/1');
});

router.get('/ign/page/:pageNum', (req, res) => {
  getPage(req, res, 'IGN');
});

router.get('/gamespot', (req, res) => {
  res.redirect('/articles/gamespot/page/1');
});

router.get('/gamespot/page/:pageNum', (req, res) => {
  getPage(req, res, 'GameSpot');
});

module.exports = router;
