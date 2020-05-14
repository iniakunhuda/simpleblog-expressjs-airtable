const express = require('express');
const app = express();

const airService = require('../services/airtable-api');
const airAPI = new airService();

var articles = []

app.get('/', async (req, res) => {
    res.render('index', {articles: articles});
})

app.get('/detail/(:slug)', async (req, res) => {
    res.render('detail', {article: article}); //
})

module.exports = app;