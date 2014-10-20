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

router.route('/bears')
    .post(function(req, res){
	     var bear = new Bear();
	      bear.name = req.body.name;
	       //save the bear and check for errors
	        bear.save(function(err){
	           if(err)
		             res.send(err);
	               res.json({message: 'bear created'});
	       });
    })
    .get(function(req, res){
	       Bear.find(function(err, bears){
	          if(err)
		            res.send(err);
	          res.json(bears);
	      });
    });

router.route('/bears/:bear_id')
    // get the bear with that id
    .get(function(req, res){
	       Bear.findById(req.params.bear_id, function(err, bear){
	          if(err)
		            res.send(err);
	          res.json(bear);
	       });
    })
    // update the bear with this id
    .put(function(req, res){
	       Bear.findById(req.params.bear_id, function(err, bear){
	          if(err)
		            res.send(err);
	          bear.name = req.body.name //update the bears info
	          //save the bear
	          bear.save(function(err){
		            if(err)
		                res.send(err);
		            res.json({message: 'Bear updated!'});
	          });
	      });
    })
    .delete(function(req, res){
      Bear.remove({
        _id: req.params.bear_id
      }, function(err, bear){
        if(err)
          res.send(err);
        res.json({message: 'Successfully deleted'});
      });
    });

app.use('/api', router);

app.listen(port);
console.log('listening on port ' + port);
