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
  

/*  occupation: { type: String }, 
  company: { type: String }, 
  name: {
    first: { type: String },
    last: { type: String }
  }, 
  gender: { type: String },
  likes: [{ type: String }],
  dislikes: [{ type: String }],
  education: { type: String }, 
  age: { type: Number, min: 1, max: 120 }, 
  birthday: { type: Date },
  createdAt: { type: Date, default: Date.now }*/

/*tenantSchema.pre('save', function(next) {
  this.age = moment().diff(moment(this.birthday), 'years');
  console.log(this.age);
  next();
});*/

Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
