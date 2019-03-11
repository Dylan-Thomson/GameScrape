/* eslint-disable global-require */

module.exports = (app) => {
  app.use('/', require('./controllers/home'));
  app.use('/scrape', require('./controllers/scrape'));
  app.use('/articles', require('./controllers/articles'));
  app.use('/api', require('./controllers/commentsAPI'));
};
