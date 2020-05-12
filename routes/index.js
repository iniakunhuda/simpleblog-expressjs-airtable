const express = require('express');
const app = express();

const airService = require('../services/airtable-api');
const airAPI = new airService();

var articles = []

app.get('/', async (req, res) => {
    await airAPI.getAll('Articles').then((data) => {
        data.forEach(function(r) {
            let obj = r;
            articles.push({
                'id': obj.id,
                'gambar': obj.fields.Gambar,
                'judul': obj.fields.Judul,
                'text': obj.fields.Text,
                'slug': obj.fields.Slug,
            })
        });
        res.render('index', {articles: articles});
    });
})

app.get('/detail/(:slug)', async (req, res) => {
    var filter = `{Slug} = "${req.params.slug}"`;

    await airAPI.getOne('Articles', filter).then((data) => {
        if(data.length < 1) {
            res.render('404');
            return;   
        }

        let obj = data[0];
        var article = {
            'id': obj.id,
            'gambar': obj.fields.Gambar,
            'judul': obj.fields.Judul,
            'text': obj.fields.Text,
            'slug': obj.fields.Slug,
        };
        res.render('detail', {article: article});
    });    
    // await base('Articles').select({
    //     filterByFormula: `{Slug} = "${req.params.slug}"`
    // }).firstPage(function(err, records) {
    //     records.forEach(function(record) {
    //         var article = {
    //             'id': record.id,
    //             'gambar': record.get('Gambar'),
    //             'judul': record.get('Judul'),
    //             'text': record.get('Text'),
    //             'slug': record.get('Slug'),
    //         };
    //         res.render('detail', {article: article});
    //     });        
    // });
})

module.exports = app;