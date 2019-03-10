/* eslint no-underscore-dangle: 0 */
const express = require('express');

const router = express.Router();
const db = require('../models');

router.get('/:articleID/comments', (req, res) => {
  db.Article.find({ _id: req.params.articleID }).populate('comments').then((dbArticle) => {
    res.json(dbArticle);
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/:id', (req, res) => {
  db.Comment.find({ _id: req.params.id }).then((dbComment) => {
    res.json(dbComment);
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/:articleID/comments', (req, res) => {
  db.Comment.create(req.body).then(dbComment => db.Article.findOneAndUpdate(
    { _id: req.params.articleID },
    { $push: { comments: dbComment._id } },
    { new: true },
  )).then((dbArticle) => {
    res.json(dbArticle);
  }).catch((err) => {
    console.log(err);
  });
});

router.delete('/:id', (req, res) => {
  db.Comment.remove({ _id: req.params.id }).then((dbComment) => {
    res.json(dbComment);
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
