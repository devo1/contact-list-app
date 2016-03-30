var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var config = require('./config/config');

var db = mongojs('mongodb://admin:admin123@ds059365.mlab.com:59365/guru99',['contactlist']);
//var db = contactlist.connection;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
    //console.log('I received a Get request');

    db.contactlist.find(function (req, docs) {
        //console.log('inside find() of get');
        //console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist', function (req, res) {
    //console.log('inside post');
    //console.log(req.body);
    db.contactlist.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});
app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    //console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    //console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});
app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    //console.log(req.params.id);
    db.contactlist.findAndModify({
        query: {_id: mongojs.ObjectID(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true
    }, function (err, doc) {
        res.json(doc);
    });
});

app.listen(3000);
//console.log('Server is running on port 3000');