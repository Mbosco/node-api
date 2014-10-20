//server.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Bear = require('./app/models/bear');

mongoose.connect('mongodb://boot2docker:27017');

//configure app to use bodyParser()
//this will let us get the data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUT API
var router = express.Router();

//middleware to use for all requests
router.use(function(req, res, next){
    //do logging
    console.log('request received, something is happening');
    next();//make sure we proceed
});
router.get('/', function(req, res){
    res.json(
	{message: 'hooray! welcome to our api!'}
    );
});
// more routes for our api happen here
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port' + port);
