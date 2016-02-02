var express = require('express');
var router = express.Router();

var Apartment = require('../models/apartment');
var Tenant = require('../models/tenant');


router.get('/tenants/first/:limit', function(req, res, next) {
  console.log("get first "+req.params.limit+ " tenants");
  Apartment.find({}, function(err, tenants){
    res.status(err ? 400 : 200).send(err || tenants);
  }).limit(req.params.limit);
});


router.get('/showpage/:aptId', function(req, res, next){
  Apartment.findById(req.params.aptId, function(err, apartment){
      if(err) res.status(400).send(err); 
      Tenant.find({apartment:apartment.id}, function(err, tenants){
        res.render('showPage', {apartment:apartment, tenants:tenants});
      });
  }); 
});

router.post('/', function(req, res, next) {
  
  req.body.availableRooms = req.body.totalRooms;

  Apartment.create(req.body, function(err, savedApartment) {
    res.status(err ? 400 : 200).send(err || savedApartment);
  });
});

router.get('/', function(req, res, next) {  
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
    if(err) return res.status(400).send(err); 
    res.render('index', {apartments:apartments, state:'apartments'});
  });
});

module.exports = router;
