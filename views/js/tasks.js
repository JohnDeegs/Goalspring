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

  $.get('/tasks/days/weekly/previous/'+urlId+'', function(data, status){

    var obj = data;

    console.log(data);

    /*
    A function to add up all the elements of an int array
    This is used to calculate the total hours for each
    category
    */

    function addArrayHours(arr){
      console.log(arr);
      var total = 0;

      for(var j in arr){
        total += arr[j];
      }

      return total;
    }

    /*
    A function that will take both the start and end time
    of each task as they appear in the database and format
    these strings into integers of which we can get int
    durations for our task hour calculations
    */

    function getDuration(start, end){

      sTime = sTime.substring(11,13);
      fTime = fTime.substring(11,13);

      sTime = parseInt(sTime);
      fTime = parseInt(fTime);

      var duration = fTime - sTime;

      return duration;
    }

    /*Declare variables out of the loop scope for
    speed purposes
     */

    var excerciseArr = [];
    var socialArr = [];
    var productiveArr = [];

    var sTime;
    var fTime;
    var total;

    for(var i = 0; i < obj.length; i++){

      if(obj[i]["category"] == "Excercise"){
       sTime = obj[i]["start"];
       fTime = obj[i]["end"];

       total = getDuration(sTime, fTime);

        excerciseArr.push(total);

      }else if(obj[i]["category"] == "Social"){
       sTime = obj[i]["start"];
       fTime = obj[i]["end"];

        var total = getDuration(sTime, fTime);

        socialArr.push(total);

      }else if(obj[i]["category"] == "Productive"){
       sTime = obj[i]["start"];
       fTime = obj[i]["end"];

       total = getDuration(sTime, fTime);

        productiveArr.push(total);

      }
    }

    /*
      Using our addArrayHours function we can now assign
      the total category hours for each category to a
      variable
    */
    
    var excerciseHours = addArrayHours(excerciseArr);
    var socialHours = addArrayHours(socialArr);
    var productiveHours = addArrayHours(productiveArr);

    //console.log(excerciseHours);
    //console.log(socialHours);
    //console.log(productiveHours);

  //on click of the generate button do this.
  $generateBtn.on('click', function(){


  });

  });

  /*$.get('/tasks/days/weekly/previous/'+urlId+'', function(data, status){

    var obj = data;

    console.log(obj);

  });*/



});
