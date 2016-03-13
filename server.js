// Import dependencies
var bodyParser = require('body-parser');
var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var path = require('path');

// Connect to mongodb
mongoose.connect('mongodb://localhost/contactlist');

// Setup app & view
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// List all contact
app.get('/contactlist', function (req, res) {
    console.log('I received a GET request');

    db.contactlist.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});
// Add a contact
app.post('/contactlist', function (req, res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

// Delete a contact
app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongoose.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

// Find a specific contact
app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongoose.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

// Edit a particular contact
app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({
            query: {_id: mongoose.ObjectId(id)},
            update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
            new: true}, function (err, doc) {
            res.json(doc);
        }
    );
});

app.listen(3000);
console.log('server is running on port 3000');