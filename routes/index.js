var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var database;

mongoClient.connect('mongodb://localhost:27017/monuments', function (err, db) {
   if (err) throw err;

    database = db;
});

router.get('/', function (req, res, next) {
   res.render('index', {'title': 'Monument Api', 'note': 'Currently the front page is under maintainance please checkout Github link below'});
});

router.get('/api', function (req, res, next) {
   res.redirect('/api/all');
});

router.get('/api/all', function(req, res, next) {
    database.collection("monuments").find({}).toArray(function (err, data) {
        res.json(data);
    });
});

router.get('/api/city/:city', function (req, res, next) {
   database.collection("monuments").find({'city' : req.params.city}).toArray(function (err, data) {
       res.json(data);
   });
});

router.get('/api/state/:state', function (req, res, next) {
    database.collection("monuments").find({'state' : req.params.state}).toArray(function (err, data) {
        res.json(data);
    });
});

router.get('/api/monument/:monument_name', function (req, res, next) {
    database.collection("monuments").find({'monuments.monument_name' : req.params.monument_name},
        {"monuments.$" : 1}).toArray(function (err, data) {

            res.json(data);
    });
});


module.exports = router;
