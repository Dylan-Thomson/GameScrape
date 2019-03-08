const express = require('express');

const router = express.Router();
const db = require('../models');

router.get('/:articleID/comments', (req, res) => {
  console.log(req.params);
  db.Article.find({ _id: req.params.articleID }).populate('comments').then((dbArticle) => {
    console.log(dbArticle.comments);
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
  console.log(req.body);
  db.Comment.create(req.body).then((dbComment) => {
    // res.json(dbComment);
    return db.Article.findOneAndUpdate({ _id: req.params.articleID }, { $push: {comments: dbComment._id}}, { new: true });
  }).then((dbArticle) => {
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
