//implements jquery
$(document).ready(function () {

  //If our task screen is empty, we prompt the user to enter their school hours.
  var $myModal = $("#myModalHorizontal");

  $myModal.modal('show');

  //array of months stored in variable
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //assign varriable to JS build in date object
  var d = new Date();

  //ensuring that the DOM is quicker we store the login form selector within a variable
  var form = $('#showForm');

//sets the date to the current date plus 1
  d.setDate(d.getDate()+1);

  //appends to the monthName ID within the html, d.getMontsh returns the month number and we return the string at index of that number from the monthNames array.
  //we can also get the current year easily by calling the getFullYear function from the Date object.
  $("#monthName").html(''+d.getDate()+' '+monthNames[d.getMonth()]+' '+d.getFullYear()+'');

  //toggles the green button

  var $addBtn = $('#addBtn');
  var $showForm = $('#showForm');

  $addBtn.click(function(){
    $showForm.toggle('slow', function(){

    });
  });

  


});
