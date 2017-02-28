var $showForm = $('#showForm');

var $addBtn = $('#addBtn');





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

  if()

  console.log(keys);

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
