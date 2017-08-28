const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
// const dataSource = require('./dataSource.js');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, docs) {
      res.render("index", {robots: docs})
    })
  })
})

app.get('/forhire', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({"job": null}).toArray(function (err, docs) {
      res.render("index", {robots: docs})
    })
  })
})

app.get('/working', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({"job": {$ne: null}}).toArray(function (err, docs) {
      res.render("index", {robots: docs})
    })
  })
})

// app.get('/', function (req, res) {
//   res.render('index');
// });


app.listen(3000, function () {
  console.log('Successfully started express application!')
});
