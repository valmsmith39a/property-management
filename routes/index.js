var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/addTenant', function(req, res, next) {
  res.render('form', {state: 'addTenant'});
});

router.get('/addApartment', function(req, res, next) {
  res.render('form', {state: 'addApartment'});
});

module.exports = router;
