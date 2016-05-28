var fs = require('fs');

exports.read = function (callback) {
    fs.readFile('./db/users.json', {encoding: 'utf8'}, function (err, data) {
        if (err) throw err;
        callback(JSON.parse(data));
    });
};

exports.write = function (data, callback) {
    fs.writeFile('./db/users.json', data, function (err) {
        if (err) throw err;
        callback();
    })
};