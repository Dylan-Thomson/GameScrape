/* eslint no-underscore-dangle: 0 */
const express = require('express');

const router = express.Router();
const db = require('../models');

router.get('/articles/:articleID/comments', (req, res) => {
  db.Article.find({ _id: req.params.articleID }).populate('comments').then((dbArticle) => {
    res.json(dbArticle);
  }).catch((err) => {
    console.log(err);
  });
});

// router.get('/:id', (req, res) => {
//   db.Comment.find({ _id: req.params.id }).then((dbComment) => {
//     res.json(dbComment);
//   }).catch((err) => {
//     console.log(err);
//   });
// });

router.post('/articles/:articleID/comments', (req, res) => {
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

router.delete('/comments/:commentID', (req, res) => {
  db.Comment.deleteOne({ _id: req.params.commentID }).then((dbComment) => {
    res.json(dbComment);
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
