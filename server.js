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
var usersTmpl = require('./db/users.json');

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
    res.render('form')
});

app.get('/add-user', function(req, res) {
    res.render('form', indexTmpl)
});

app.get('/users', function(req, res) {
    db.read(function (data) {
        var users = {"table__row":data};

        for (var i = 0; i <= data.lenght; i++) {
            users.name = data[i].name;
            users.surname = data[i].surname;
            users.age = data[i].age;
        }

        // data is an array with objects of users
        // console.log(data);
        // users is an object with property "table__row" which value is [data]
        // console.log(users);
        res.render('users', users)
    });
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
            res.redirect('/users');
        });
    });
});

app.get('/users/edit-user/:id', function(req, res) {
    var userId = req.params.id;
    db.read(function (data) {
        var editUser = data[userId-1];
        editUser.id = userId;

        res.render('edit-user', {"user__form":editUser});
    });
});

app.post('/users/edit-user/:id', function (req, res) {
    var userId = req.params.id;
    console.log(userId);
    db.read ( function(data) {
        var tableUsers = data;
        console.log(tableUsers);
        console.log(tableUsers[userId-1]);
        tableUsers[userId-1] = {
            name: req.body.firstname,
            surname: req.body.lastname,
            age: req.body.age
        };

        db.write (JSON.stringify(tableUsers), function () {
            res.redirect('/users');
        });
    });
});

// delete a user
app.get('/users/delete/:age', function (req, res) {
    var userAge = req.params.age;
    db.read ( function(data) {
        for (var i = 0; i < data.length; i++) {
            if(data[i].age === userAge) {
                var currentUser = i;

                data.splice(currentUser, 1);

                db.write ( JSON.stringify(data),function() {
                    res.redirect('/users');
                });
            }
        }

    });
});

app.listen(config.port, function () {
    console.log('Server listening on: http://localhost:%s', config.port);
});