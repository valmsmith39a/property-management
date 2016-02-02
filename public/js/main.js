'use strict'

$(document).ready(init);

function init(){
  console.log('in init!');

  $('.selectTenant').on('click', selectTenant);
  $('.move').on('click', move);

  $('#addTenant').on('click', addTenant);
  $('#addApartment').on('click', addApartment);

  $('.showApartment').on('click', showDetails);
}

function showDetails(){
  console.log('in show details');
  console.log('this data is: ', $(this).data().apartmentid.replace(/\"/g,""));
  location.href = '/apartments/showpage/' + $(this).data().apartmentid.replace(/\"/g,"");
}

function addTenant(){

  $.get('/addTenant', function(err, data){
    location.replace('/addTenant');
  });

}

function addApartment(){
  $.get('/addApartment', function(err, data){
    location.replace('/addApartment');
  });

}


function move(e){
  e.preventDefault();

  var apartmentId = $(this).data().apartmentid.replace(/\"/g,"");
  var tenantId = $(this).data().tenantid;
  //var status = $(this).data().status; 

  var url = ("/tenants/" + tenantId + "/" + apartmentId); // (status === "hasHome") ? ("/tenants/" + tenantId + "/" + apartmentId) : ("/tenants/remove" + tenantId + "/" + apartmentId);

  $.ajax({
    url: url, 
    method: "PUT"
  })
  .success(function(data) {
    location.replace('/tenants');
  })
  .fail(function(err) {
    alert('Error. Check console.');
    console.error("Error:", err);
  });

}

function selectTenant(e){
  e.preventDefault();

  var tenantId = $(this).data().tenantid.replace(/\"/g,""); 
  var status = $(this).data().status;

  if(status === 'hasHome'){
    $.ajax({
    url: '/tenants/remove/' + tenantId, 
    method: "PUT"
  })
  .success(function(data) {
    location.replace('/tenants');
  })
  .fail(function(err) {
    alert('Error. Check console.');
    console.error("Error:", err);
  });


  }

  location.href = '/tenants/move/' + tenantId + '/' + status; 
}

