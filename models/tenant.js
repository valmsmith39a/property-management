'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var Apartment = require('../models/apartment');
var Tenant; 

var tenantSchema = new mongoose.Schema({
  name:{type:String}, 
  apartment: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment" }, 
  hasHome: {type:Boolean, default:false}
});

Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
