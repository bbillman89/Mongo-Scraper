let db = require('../models');

module.exports = function(app){
    
    app.get('/', function(req, res){
        res.render('articles');
    })

    app.get('/saved', function(req, res){
        res.render('saved');
    })

}
