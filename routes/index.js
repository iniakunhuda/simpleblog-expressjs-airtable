const express = require('express');
const app = express();

var Airtable = require('airtable');
var base = new Airtable({apiKey: API_KEY}).base(BASE_KEY);
var articles = []

app.get('/', async (req, res) => {
    await base('Articles').select().firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        articles = []
        records.forEach(function(record) {
            articles.push({
                'id': record.id,
                'gambar': record.get('Gambar'),
                'judul': record.get('Judul'),
                'text': record.get('Text'),
                'slug': record.get('Slug'),
            })
        });
    });
    await res.render('index', {articles: articles});
})

app.get('/detail/(:slug)', async (req, res) => {
    await base('Articles').select({
        filterByFormula: `{Slug} = "${req.params.slug}"`
    }).firstPage(function(err, records) {
        records.forEach(function(record) {
            var article = {
                'id': record.id,
                'gambar': record.get('Gambar'),
                'judul': record.get('Judul'),
                'text': record.get('Text'),
                'slug': record.get('Slug'),
            };
            res.render('detail', {article: article});
        });        
    });
})

module.exports = app;