let express = require('express');
let router = express.Router();
let db = require('../models');

router.get('/', function(req, res){
    res.render('articles');
    /*db.Article(function(data){
    })*/
})