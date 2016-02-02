var express = require('express');
var router = express.Router();


var Tenant = require('../models/tenant');
var Apartment = require('../models/apartment');

/*router.get('/tenants/first/:limit', function(req, res, next) {
  console.log("get first "+req.params.limit+ " tenants");
  Tenant.find({}, function(err, tenants){
    res.status(err ? 400 : 200).send(err || tenants);
  }).limit(req.params.limit);
});*/

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
    // res.status(err ? 400 : 200).send(err || tenants);
    if(err) return res.status(400).send(err); 
    res.render('index', {tenants:tenants, state:'tenants'});
  });
  
});

// Clean 
router.get('/move/:tenantId/:status', function(req, res, next) {
  console.log('in router.get move/:tenantid', req.params.tenantId);

  Apartment
  .find({})
  .exec(function(err, apartments){
    // res.status(err ? 400 : 200).send(err || tenants);
    if(err) return res.status(400).send(err); 
    res.render('index', {apartments:apartments, state:'move',tenantId:req.params.tenantId, status:req.params.status});
  });
});

// :apartment
router.put('/remove/:tenant', function(req, res, next){
  console.log('inside put request', req.params.tenant);
  //console.log('req params tenant', req.params.apartment);
  Tenant.findById(req.params.tenant, function(err, tenant){
    if(err) res.status(400).send(err); 
    if(!tenant.hasHome) {res.send('Tenant already HOMELESS.'); return;};
    Apartment.findById(tenant.apartment.toString(), function(err, apartment){
      if(err) res.status(400).send(err); 
      console.log('found tenant!', tenant);
      tenant.hasHome = false;
      apartment.availableRooms++; 
      delete tenant.apartment; 
      tenant.save(function(err, savedTenant){
        apartment.save(function(err, savedApartment){
          res.status(err ? 400 : 200).send(err || savedTenant);
          console.log('saved tenant with reference removed');
        });
      });
    });
    

  });
});

router.put('/:tenant/:apartment', function(req, res, next){
  console.log('inside put request', req.params.tenant);
  console.log('req params tenant', req.params.apartment);
  Tenant.findById(req.params.tenant, function(err, tenant){
    if(err) res.status(400).send(err); 
    if(tenant.hasHome) {res.send('Tenant already has a home.'); return;};
    console.log('found tenant!', tenant);
    Apartment.findById(req.params.apartment, function(err, apartment){
      if(err) res.status(400).send(err); 
      if(apartment.availableRooms === 0) {res.send('No rooms available'); return;};
      console.log('found tenant!', tenant);
      tenant.hasHome = true;
      apartment.availableRooms--; 
      tenant.apartment = apartment._id;
      tenant.save(function(err, savedTenant){
        apartment.save(function(err, savedApartment){
          res.status(err ? 400 : 200).send(err || savedTenant);
          console.log('saved tenant with reference to Apartment');
        });
      });
    });
  });
});




// router.put('/', function(req.))


module.exports = router;
