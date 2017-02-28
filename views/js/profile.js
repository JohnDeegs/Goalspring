$(document).ready(function(){

  //get the url
  alert(window.location.href);

  //if the user has no stored data for this date already, then show the modal, if not then go straight to the page

  $.get("https://still-stream-97435.herokuapp.com/tasks", function(data, status){
    alert(data);
  });

});
