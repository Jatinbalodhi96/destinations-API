var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var database;

mongoClient.connect('mongodb://localhost:27017/monuments', function (err, db) {
   if (err) throw err;

    database = db;
});

router.get('/api/all', function(req, res, next) {
    database.collection("monuments").find({}).toArray(function (err, data) {
        res.json(data);
    });
});

router.get('/api/:city', function (req, res, next) {
   database.collection("monuments").find({'city' : req.params.city}).toArray(function (err, data) {
       res.json(data);
   });
});

router.get('/api/monument/:monument_name', function (req, res, next) {
    database.collection("monuments").find({'monuments.monument_name' : req.params.monument_name},
        {"monuments.$" : 1}).toArray(function (err, data) {

            res.json(data);
    });
});

router.post('/api/add/:city/:about', function (req, res, next) {
    database.collection("monuments").insert()
});
module.exports = router;
