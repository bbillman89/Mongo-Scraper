const express = require('express');
const mongoose = require('mongoose');

let PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//const html_routes = require('./routes/html-routes.js')(app);
const api_routes = require('./routes/api-routes.js');
//app.use(html_routes);
app.use(api_routes);

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
let config = {useNewUrlParser: true};
mongoose.connect(MONGODB_URI, config);

app.listen(PORT, function(){
    console.log('Listening @ localhost:' + PORT);
});