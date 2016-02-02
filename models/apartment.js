'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
// var jwt = require('jwt-simple');
// var JWT_SECRET = process.env.JWT_SECRET;

var Apartment; 

var apartmentSchema = new mongoose.Schema({
  numberOfRooms:{type:Number},
  rentPerRoom: {type:Number},
  imageURL:{type:String} 
})

/*personSchema.pre('save', function(next) {
  this.age = moment().diff(moment(this.birthday), 'years');
  console.log(this.age);
  next();
});*/

Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
