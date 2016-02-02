'use strict';

$(document).ready(init);

function init(){
  console.log('in init!');
  $('#addTenant').on('click', addTenant);
  $('#addApartment').on('click', addApartment);
}

function addTenant(e){
  e.preventDefault();
  location.href = 

  $.post('/tenants', {name: $('#name').val()})
  .success(function() {
    location.href = '/tenants';
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('err:', err);
  });
}

function addApartment(e){
  e.preventDefault();

   $.post('/apartments', {
    totalRooms: $('#totalRooms').val(),
    rentPerRoom: $('#rentPerRoom').val(),
    imageURL: $('#imageURL').val()
  })
  .success(function() {
    location.href = '/apartments';
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('err:', err);
  });

}

