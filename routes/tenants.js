var express = require('express');
var router = express.Router();


var Tenant = require('../models/tenant');
var Apartment = require('../models/apartment');

router.get('/tenants/first/:limit', function(req, res, next) {
  console.log("get first "+req.params.limit+ " tenants");
  Tenant.find({}, function(err, tenants){
    res.status(err ? 400 : 200).send(err || tenants);
  }).limit(req.params.limit);
});

router.post('/', function(req, res, next) {
  console.log('inside post of tenants router file');
  console.log('req.body is: ', req.body);
  Tenant.create(req.body, function(err, savedTenant) {
    console.log('saved tenant: ', savedTenant);
    res.status(err ? 400 : 200).send(err || savedTenant);
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

  Tenant
  .find(req.query).limit(limit).sort(sortObj)
  .exec(function(err, tenants){
    res.status(err ? 400 : 200).send(err || tenants);
  });
  
});

router.put('/:tenant/:apartment', function(req, res, next){
  console.log('inside put request', req.params.tenant);
  console.log('req params tenant', req.params.apartment);
  res.send('it worked!');

  // Tenant.find


});


// router.put('/', function(req.))


module.exports = router;
