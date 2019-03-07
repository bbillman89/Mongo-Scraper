const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./models');

let PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//const html_routes = require('./routes/htmlroutes.js');
//const api_routes = require('./routes/api-routes.js');
//app.use(html_routes);
//app.use(api_routes);

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
let config = {useNewUrlParser: true};
mongoose.connect(MONGODB_URI, config);

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

            db.Article.create(result).then(function(dbArt){
                console.log(dbArt);
            })
            .catch(function(e){
                console.log(e);
            })
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

app.listen(PORT, function(){
    console.log('Listening @ localhost:' + PORT);
});