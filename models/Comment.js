const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
