require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(flash());
app.use(logger('dev'));

// Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUnitialized: true,
    resave: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
  }),
);
app.set('view engine', 'handlebars');

// Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


app.listen(PORT, () => {
  console.log(
    '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
    PORT,
    PORT,
  );
});
