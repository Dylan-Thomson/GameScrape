const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
