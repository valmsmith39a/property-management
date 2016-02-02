var express = require('express');
var router = express.Router();


var Tenant = require('../models/tenant');
var Apartment = require('../models/apartment');

router.post('/', function(req, res, next) {
  console.log('inside post of tenants router file');
  console.log('req.body is: ', req.body);
  Tenant.create(req.body, function(err, savedTenant) {
    console.log('saved tenant: ', savedTenant);
    res.status(err ? 400 : 200).send(err || savedTenant);
  })
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

  Tenant
  .find(req.query).limit(limit).sort(sortObj)
  .exec(function(err, tenants){
    // res.status(err ? 400 : 200).send(err || tenants);
    if(err) return res.status(400).send(err); 
    res.render('index', {tenants:tenants, state:'tenants'});
  });
  
});

router.get('/move/:tenantId/:status', function(req, res, next) {
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
  Tenant.findById(req.params.tenant, function(err, tenant){
    if(err) res.status(400).send(err); 
    if(!tenant.hasHome) {res.send('Tenant already HOMELESS.'); return;};
    Apartment.findById(tenant.apartment.toString(), function(err, apartment){
      if(err) res.status(400).send(err); 
      tenant.hasHome = false;
      apartment.availableRooms++; 
      delete tenant.apartment; 
      tenant.save(function(err, savedTenant){
        apartment.save(function(err, savedApartment){
          res.status(err ? 400 : 200).send(err || savedTenant);
        });
      });
    });
  });
});

router.put('/:tenant/:apartment', function(req, res, next){
  Tenant.findById(req.params.tenant, function(err, tenant){
    if(err) res.status(400).send(err); 
    if(tenant.hasHome) {res.send('Tenant already has a home.'); return;};
    Apartment.findById(req.params.apartment, function(err, apartment){
      if(err) res.status(400).send(err); 
      if(apartment.availableRooms === 0) {res.send('No rooms available'); return;};
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

module.exports = router;
