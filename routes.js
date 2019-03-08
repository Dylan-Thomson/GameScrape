/* eslint-disable global-require */

module.exports = (app) => {
  app.use('/', require('./controllers/home'));
  app.use('/scrape', require('./controllers/scrape'));
  app.use('/articles', require('./controllers/articles'));
  app.use('/api/articles/:article/comments', require('./controllers/commentsAPI'));
};
