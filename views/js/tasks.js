//implements jquery
$(document).ready(function() {

  var form = $('#showForm');

  //Get the url

  var url = window.location.href;
  console.log(url);

  //get the id of the day which is in the url

  let urlId = url.substr(url.length - 8);
  console.log(urlId);

  //============================================================================
  //Posting the create data from to the db

  //importing time picker library
  $('.time').timepicker({'timeFormat': 'H:i', 'scrollDefault': 'now'});

  //form
  form.on('submit', function(e) {
    e.preventDefault(); //prevents form from submitting before our changes

    //Declare Variables

    var userStartTime = $('#sTime');
    var userFinishTime = $('#eTime');

    //==========================================================================
    //Time Validation
    //User cannot set the end time as happening before the start time.
    var sTime = $('#sTime').val();
    var fTime = $('#eTime').val();

    var sCheck = sTime.substring(0,2);
    var fCheck = fTime.substring(0,2);

    sCheck = parseInt(sCheck);
    fCheck = parseInt(fCheck);

    if(sCheck > fCheck){
      alert("There's no flux capacitor to take you back in time here!");
      return;
    }

    //// End of Validation
    //==========================================================================

    //Formatting for mySQL datetime

    var date;
    date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var mySqlDate = ''+year+':'+month+':'+day+'';


    //Translating the user inputs to our new MySQL translated strings
    userStartTime.val(''+mySqlDate+' '+sTime+':00');
    userFinishTime.val(''+mySqlDate+' '+fTime+':00');

    //Submit the form
    this.submit();

  });

  //assing the button to a variable for speed purposes

  var $analyzeBtn = $('#analyzeBtn');

  $analyzeBtn.click(function(){
    window.location.href = '/tasks/days/analyze/'+urlId+'';
  });

  //============================================================================

  //AI

  //variables
  var $generateBtn = $('#generateBtn');

  console.log("This file");

  //on click of the generate button do this.
  $generateBtn.on('click', function(){
    alert("clicked");
  });

  /*$.get('/tasks/days/weekly/previous/'+urlId+'', function(data, status){

    var obj = data;

    console.log(obj);

  });*/



});
