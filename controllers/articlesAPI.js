/* eslint no-underscore-dangle: 0 */
const express = require('express');

const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.Article.find({}).then((dbArticle) => {
    res.json(dbArticle);
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/:articleID', (req, res) => {
  db.Article.find({ _id: req.params.articleID }).then((dbArticle) => {
    res.json(dbArticle);
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/:articleID/comments', (req, res) => {
  db.Article.find({ _id: req.params.articleID }).populate('comments').then((dbArticle) => {
    res.json(dbArticle);
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/:articleID/comments', (req, res) => {
  let comment;
  db.Comment.create(req.body).then((dbComment) => {
    comment = dbComment;
    return db.Article.findOneAndUpdate(
      { _id: req.params.articleID },
      { $push: { comments: dbComment._id } },
      { new: true },
    );
  }).then(() => {
    res.json(comment);
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
