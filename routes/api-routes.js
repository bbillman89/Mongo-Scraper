const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

module.exports = function(app){

    app.get('/scrape', function(req, res){

        axios.get("https://www.nps.gov/index.htm").then(function(response){
            const $ = cheerio.load(response.data);

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

                db.Article.create(result).then(dbArt => {
                    console.log(dbArt);
                })
                .catch(e => {
                    console.log(e);
                })
                console.log(result);
            })
            res.send('scrape did something');
        })
    });

    //articles that are not saved
    app.get('/unArt', (req, res) => {
        db.Article.find({saved : false}).then(dbArt => {
            res.json(dbArt);
        }).catch(e => {
            res.json(e);
        })
    })

    //articles which are saved
    app.get('/savedArt', (req, res) => {
        db.Article.find({saved : true}).then(dbArt => {
            res.json(dbArt);
        }).catch(e => {
            res.json(e);
        })
    })

    //delete articles
    app.post('/delete', (req, res) => {
        db.Article.remove({})
            .then( del => {
                res.json(del);
            }).catch(e => {
                res.json(e);
            })
    })

    //update saved to true
    app.post('/saveTrue/:id', (req, res) => {
    
        db.Article.findOneAndUpdate(req.body)
            .then(saved => {
                console.log(saved);
                return db.Article.updateOne({_id: saved._id}, {set: {saved: true}});
            })
            .then(stuff => {
                console.log(stuff);
                res.json(stuff);
            })
            .catch(e => {
                res.json(e);
            })
    })
    
    //update saved to false

}

