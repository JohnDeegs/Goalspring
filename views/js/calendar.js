//implements jquery
$(document).ready(function () {
  //array of months stored in variable
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //assign varriable to JS build in date object
  var d = new Date();

  //ensuring that the DOM is quicker we store the login form selector within a variable
  var form = $('#showForm');

  //again for DOM performance we assing the user's inputted values to variables
  var $tName = "";
  var $tDuration = 0;
  var $sTime1 = 0;
  var $sTime2 = 0;
  var $fTime1 = 0;
  var $fTime2 = 0;

  //users selection of task type
  var $cStudy = $('cStudy');
  var $cExcercise = $('cExcercise');
  var $cSocial = $('cSocial');

  //stores the identity of the selected task category later on
  var cVal = "";

  //This array is used to store what category our user has selected their task to go into, used for analysis later
  var categoryArray = [];

  var $Schedule = $('#userSchedule');

  var $removeBtn = $('#removeBtn');

  var $analyzeBtn = $('#analyzeBtn');

  var $studyComments = $('#studyComments');

  var $excerciseComments = $('#excerciseComments');

  var $socialComments = $('#socialComments');

  var socialArray = [];

  var excerciseArray = [];

  var studyArray = [];

//sets the date to the current date plus 1
  d.setDate(d.getDate()+1);

  //appends to the monthName ID within the html, d.getMontsh returns the month number and we return the string at index of that number from the monthNames array.
  //we can also get the current year easily by calling the getFullYear function from the Date object.
  $("#monthName").html(''+d.getDate()+' '+monthNames[d.getMonth()]+' '+d.getFullYear()+'');


  var $showForm = $('#showForm');

  var $addBtn = $('#addBtn');

  $addBtn.click(function(){
    $showForm.toggle('slow', function(){

    });
  });

  $(function() {
    $("#datepicker").datepicker({
      onSelect: function(){
        var dateObject = $(this).datepicker('getDate');
        alert(dateObject);
      }
    });
  });

  $('#text2').timepicker({ 'scrollDefault': 'now' });
  $('#text3').timepicker({ 'scrollDefault': 'now' });

  //Get user's current data if exists
  $.get("http://localhost:8080/tasks", function(data, status){
    //alert("Data: " + data + "\nStatus: " + status);
    var keys = Object.keys(data);

    for(var i = 0; i < keys.length; i++){
      var val = data[keys[i]];

      //console.log(val);
    }


  });

  form.on('submit', function(e) {
    e.preventDefault(); //prevents form from submitting before our changes

    var colors = ['#ffad33', '#9999ff', '#4db8ff'];

    var randomColor = Math.floor(Math.random() * colors.length);

    var finalColor = colors[randomColor];

    //colors.splice(randomColor, 1);

    if(colors.length == 0){
      var colors = ['#0066ff', '#ff3300', '#000000']
    }

    //var randomColor = colors[Math.floor(Math.random() * colors.length)];

    var text = $('#text1').val();
    var sTime = $('#text2').val();
    var fTime = $('#text3').val();

    var sCheck = sTime.charAt(0);
    var fCheck = fTime.charAt(0);

    sCheck = parseInt(sCheck);
    fCheck = parseInt(fCheck);

    if(sCheck > fCheck){
      alert("There's no flux capacitor to take you back in time here!");
    }else{
    $('#taskList').append('<div id="taskBlock" style="background-color: '+colors[randomColor]+';"><p>'+text+'</p><p id="smallertext">'+sTime+' - '+fTime+'</p></div>').show();
    }

    //$('#taskFormat').append('<div id="whitespace"></div>');
  });

  $removeBtn.click(function(){
    $('#userSchedule tr:last').remove();
  });


})
