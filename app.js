var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var mongoLikeForRealz;


// Connection URL
var url = 'mongodb://localhost:27017/play';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  console.log('Connected correctly to server');

  mongoLikeForRealz = db;
  //db.close();
});


app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/users', function (req, res) {
  console.log('get', req.query);

  var collection = mongoLikeForRealz.collection('users');
  
  collection.find({}).toArray(function(err, docs) {
    res.send(docs);
  });
});

app.post('/users', function (req, res) {
  console.log('post', req.body);

  var collection = mongoLikeForRealz.collection('users');
  collection.insert(req.body, function (err, result) {
    if (err)
      return res.status(500).send('sorry');

    res.send(result);
  });
});

 
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
