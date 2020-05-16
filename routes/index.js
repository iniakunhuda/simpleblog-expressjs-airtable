const express = require('express');
const app = express();

const airService = require('../services/airtable-api');
const airAPI = new airService();


app.get('/', async (req, res) => {
    var articles = []
    res.render('index', {articles: articles});
})

app.get('/detail/(:slug)', async (req, res) => {
    var article = {}    
    res.render('detail', {article: article}); //
})

module.exports = app;