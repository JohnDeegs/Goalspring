//implements jquery
$(document).ready(function() {

  //Get the url

  var url = window.location.href;
  console.log(url);

  //get the id of the day which is in the url

  let urlId = url.substr(url.length - 8);
  console.log(urlId);

  //assing the button to a variable for speed purposes

  var $generateBtn = $('#generateBtn');

  $generateBtn.click(function(){
    window.location.href = '/tasks/days/analyze/'+urlId+'';
  });

});
