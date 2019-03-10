const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

const router = express.Router();

const scrapePCGamer = (req, res) => {
  axios.get('https://www.pcgamer.com/news/').then((response) => {
    const $ = cheerio.load(response.data);
    $('.listingResult').each((i, element) => {
      const result = {};
      result.title = $(element).find('.article-name').text();
      result.link = $(element).find('a').attr('href');
      result.image = $(element).find('img').attr('data-src');

      // Select only the text directly inside of .synopsis
      result.summary = $(element).find('.synopsis').clone().children()
        .remove()
        .end()
        .text();

      result.source = 'PC Gamer';
      result.sourceLink = 'https://www.pcgamer.com/';
      db.Article.create(result).catch((err) => {
        console.log(err);
      });
    });
    res.redirect('/articles/pcgamer');
  });
};

const scrapeIGN = (req, res) => {
  axios.get('https://www.ign.com/articles?tags=news').then((response) => {
    const $ = cheerio.load(response.data);
    $('.inc-blogrollv2articles .listElmnt').each((i, element) => {
      const result = {};
      result.title = $(element).find('.listElmnt-storyHeadline').text();
      // Just get the first part of the URL before any ? are added to ensure unique article links
      [result.link] = [$(element).find('.listElmnt-storyHeadline').attr('href').split('?')[0]];

      // Get image URL from data-attribute if there is one, otherwise from src
      if ($(element).find('.thumb img').data('original')) {
        result.image = $(element).find('.thumb img').data('original');
      } else {
        result.image = $(element).find('.thumb img').attr('src');
      }

      // Select only the text directly inside of p tag
      result.summary = $(element).find('p').clone().children()
        .remove()
        .end()
        .text()
        .trim();

      result.source = 'IGN';
      result.sourceLink = 'https://www.ign.com/';
      console.log(result);
      db.Article.create(result).catch((err) => {
        console.log(err);
      });
    });
    res.redirect('/articles/ign');
  });
};

const scrapeGameSpot = (req, res) => {
  axios.get('https://www.gamespot.com/news/').then((response) => {
    const $ = cheerio.load(response.data);
    $('.media-article').each((i, element) => {
      const result = {};
      result.title = $(element).find('.media-title').text();
      result.link = `https://www.gamespot.com${$(element).find('a').attr('href')}`;
      result.image = $(element).find('img').attr('src');
      result.summary = $(element).find('.media-deck').text().trim();
      result.source = 'GameSpot';
      result.sourceLink = 'https://www.gamespot.com/';
      console.log(result);
      db.Article.create(result).catch((err) => {
        console.log(err);
      });
    });
    res.redirect('/articles/gamespot');
  });
};

router.get('/pcgamer', scrapePCGamer);

router.get('/ign', scrapeIGN);

router.get('/gamespot', scrapeGameSpot);

module.exports = router;
