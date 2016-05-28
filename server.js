var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var exphbs = require('express-handlebars');
// var routes = require('./routes/index');
// var users = require('./routes/users');
var db = require('./db.js');
var fs = require('fs');
var indexTmpl = require('./db/index-template.json');

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');
app.set('views', (__dirname + '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
// app.use('/', routes);
// app.use('/users', users);

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.get('/', function(req, res) {
    res.render('form', indexTmpl)
});

app.post('/', function(req, res) {
    db.read(function (data) {
        var tableUsers = data;
        tableUsers.push({
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age
        });

        console.log(tableUsers);
        db.write(JSON.stringify(tableUsers), function () {
            // res.redirect('/');
            res.render('form', indexTmpl);
            res.render('users', tableUsers);
        });
    });
});


app.listen(config.port, function () {
    console.log('Server listening on: http://localhost:%s', config.port);
});