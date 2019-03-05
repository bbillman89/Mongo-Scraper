const express = require('express');
let PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/*const html_routes = require('./routes/htmlroutes.js');
const api_routes = require('./routes/apiroutes.js');
app.use(html_routes);
app.use(api_routes);*/

app.listen(PORT, function(){
    console.log('Listening @ localhost:' + PORT);
});