var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var exphbs = require('express-handlebars');
var db = require('./db.js');
var fs = require('fs');

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');
app.set('views', (__dirname + '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.get('/', function(req, res) {
    db.read(function (data) {
        console.log(data);
        res.render('form', data)
    })
});

app.post('/', function(req, res) {
    db.read(function (data) {
        var tableUsers = data.table__row;
        // tableUsers.push({
        //     name: req.body.table__row.name,
        //     surname: req.body.table__row.surname,
        //     age: req.body.table__row.age
        // });

        // console.log(tableUsers);

        // db.write(JSON.stringify(tableUsers), function () {
        //     res.redirect('/');
        // });
    });
});


app.listen(config.port, function () {
    console.log('Server listening on: http://localhost:%s', config.port);
});