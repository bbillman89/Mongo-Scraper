const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

module.exports = function(app){

    app.get('/scrape', function(req, res){

        axios.get("https://www.nps.gov/index.htm").then(function(response){
            var $ = cheerio.load(response.data);

            $('div .Feature').each(function(ind, ele){
                let result = {};

                result.title = $(this)
                    .children('a').children('div').children('h3')
                    .text().trim();
                result.description = $(this)
                    .children('p')
                    .text();
                result.link = $(this)
                    .children('a')
                    .attr("href");

                /*db.Article.create(result).then(function(dbArt){
                    console.log(dbArt);
                })
                .catch(function(e){
                    console.log(e);
                })*/
                console.log(result);
            })
            res.send('scrape did something');
        })
    });

    app.get('/articles', function(req, res){
        db.Article.find({}).then(function(dbArt){
            res.json(dbArt);
        }).catch(function(e){
            res.json(e);
        })
    })

}

