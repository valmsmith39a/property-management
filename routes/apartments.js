var express = require('express');
var router = express.Router();

var Apartment = require('../models/apartment');

router.get('/tenants/first/:limit', function(req, res, next) {
  console.log("get first "+req.params.limit+ " tenants");
  Apartment.find({}, function(err, tenants){
    res.status(err ? 400 : 200).send(err || tenants);
  }).limit(req.params.limit);
});

router.post('/', function(req, res, next) {
  console.log('inside post of tenants router file');
  console.log('req.body is: ', req.body);
  /*var object = {};

  object.totalRooms = req.body.totalRooms;
  object.rentPerRoom = req.body.rentPerRoom;
  object.availableRooms = object.totalRooms;*/

  req.body.availableRooms = req.body.totalRooms;

  Apartment.create(req.body, function(err, savedApartment) {
    console.log('saved tenant: ', savedApartment);
    res.status(err ? 400 : 200).send(err || savedApartment);
  })
});

// Clean 
router.get('/', function(req, res, next) {

  //res.send('inside get router');
  
  if (req.query.sort) {
    var sortObj = {};
    sortObj[req.query.sort] = req.query.desc ? -1 : 1;
  };

  if (req.query.limit) {
    var limit = parseInt(req.query.limit);
  };

  delete req.query.sort;
  delete req.query.desc;
  delete req.query.limit;

  Apartment
  .find(req.query).limit(limit).sort(sortObj)
  .exec(function(err, apartments){
    res.status(err ? 400 : 200).send(err || apartments);
  });
  
});




// router.put('/', function(req.))


module.exports = router;
