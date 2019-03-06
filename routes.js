/* eslint-disable global-require */

module.exports = (app) => {
  app.use('/', require('./controllers/index'));
  app.use('/scrape', require('./controllers/scrape'));
};
