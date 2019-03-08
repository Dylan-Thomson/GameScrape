const express = require('express');

const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.Comment.find({}).then((dbComment) => {
    res.json(dbComment);
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

router.post('/', (req, res) => {
  db.Comment.create(req.body).then((dbComment) => {
    res.json(dbComment);
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
