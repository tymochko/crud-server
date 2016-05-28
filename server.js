var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var exphbs = require('express-handlebars');
// var routes = require('./routes/index');
// var users = require('./routes/users');
var jsonData = require('./db.json');
var fs = require('fs');

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');
app.set('views', (__dirname + '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);
app.use(express.static(__dirname + '/public'));
// app.use('/', routes);
// app.use('/users', users);

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.get('/', function(req, res) {
    res.render('form', jsonData)
});

app.post('/', function(req, res) {
    fs.writeFile('db.json', req.body);
    // res.render('form', req.body)
});


app.listen(config.port, function () {
    console.log('Server listening on: http://localhost:%s', config.port);
});