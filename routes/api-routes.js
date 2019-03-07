const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

module.exports = function(app){

    //Scraping the site
    app.get('/scrape', function(req, res){
        
        axios.get('https://old.reddit.com/r/webdev/').then(function(response){
            let $ = cheerio.load(response.data);
            let results = [];
            $('p.title').each(function(ind, ele){
                let title = $(ele).text();
                let link = $(ele).children().attr('href');
                results.push({
                    title: title,
                    link: link
                });
            });
            console.log(results);
        });


        /*axios.get("https://www.nps.gov/index.htm").then(function(response){
            var $ = cheerio.load(response.data);

            $('div .Feature').each(function(ind, ele){
                let result = {};

                result.title = $(this)
                    .children('h3')
                    .text();
                result.link = $(this)
                    .children('a')
                    .attr("href");

                db.Article.create(result).then(function(dbArt){
                    console.log(dbArt);
                })
                .catch(function(e){
                    console.log(e);
                })
            })
        })*/
    })

    //Get all articles from the db


    //Grab article by id, then "populate" with its note/s


    //Save & Update the note/s associate with a specific article


}

