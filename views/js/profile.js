$(document).ready(function(){


  //if the user has no stored data for this date already, then show the modal, if not then go straight to the page

  //$.get("http://localhost:8080/api/tasks/list", function(data, status){
  //  //selects the json+what i want
//    var obj = JSON.parse(data);
//    console.log(obj[0].name);
//    console.log(obj[0].id);
//    $("#taskList").append(obj[0].name);
//  });

  //To Edit a task

  $("#addBtn").click(function(){
    $("#showForm").fadeToggle("slow");
  });

  $("#editBtn").click(function(){

  });

  //------------------------CREATE----------------------------//

  $('#text2').timepicker({ 'scrollDefault': 'now' });
  $('#text3').timepicker({ 'scrollDefault': 'now' });

  $('#submitTaskBtn').click(function() {

    var sTime = $('#text2').val();
    var fTime = $('#text3').val();

    //get current date
    var d = new Date();

    //get current year
    var year = d.getUTCFullYear();

    //get current month, must add 1 for accurate reading as January is equal to 0
    var month = d.getUTCMonth() + 1;

    //get current day date
    var day = d.getDate();

    var testDate = ''+year+'-'+month+'-'+day+'';

    //splits the time string into pieces, so we can select if it's "am" or "pm" later. e.g ["4",":","0","0","p","m"]
    //selects the last two elements from this array, this will be either ["p", "m"] or ["a", "m"]
    //joins this split array into a string for verification later "pm" or "am"

    function convertTime(arg){
      var splitString = arg.split("");

      if(splitString[1] === ":"){
        splitString.unshift("0");
      }

      var getAMorPM = splitString.slice(-2).join("");

      var getJqHour = splitString.slice(0, 2).join("");

      var hour = 0;

      if(getAMorPM === "pm"){
        console.log("Found pm");
        if(getJqHour == "01"){
          hour = 13;
        }else if(getJqHour == "02"){
          hour = 14;
        }else if(getJqHour == "03"){
          hour = 15;
        }else if(getJqHour == "04"){
          hour = 16;
        }else if(getJqHour == "05"){
          hour = 17;
        }else if(getJqHour == "06"){
          hour = 18;
        }else if(getJqHour == "07"){
          hour = 19;
        }else if(getJqHour == "08"){
          hour = 20;
        }else if(getJqHour == "09"){
          hour = 21;
        }else if(getJqHour == "10"){
          hour = 22;
        }else if(getJqHour == "11"){
          hour = 23;
        }else if(getJqHour == "12"){
          hour = 0;
        }
      }else{
        hour = getJqHour;
      }

      //We've got the hour, so now we get the minutes of the task

      var minutes = splitString.slice(3, 5).join("");

      //The seconds are by default, 00 in all tasks

      var seconds = "00";

      //We put all of these together to insert into our MySQL timestamp

      var mySqlTime = ''+testDate+' '+hour+':'+minutes+':'+seconds+'';

      //return the converted time to mysql format

      return mySqlTime;
    }

    var optionToString = $('#sel1 option:selected').val();

    $('#text2').val(convertTime(sTime));
    $('#text3').val(convertTime(fTime));
    $('#sel').val(optionToString);

    $('#showForm').submit();

  });

  /*var sCheck = sTime.charAt(0);
  var fCheck = fTime.charAt(0);

  sCheck = parseInt(sCheck);
  fCheck = parseInt(fCheck);

  if(sCheck > fCheck){
    alert("There's no flux capacitor to take you back in time here!");
  }*/

/*  $("#submitTaskBtn").click(function(){

    console.log("We clicked the button");

    var taskData = {};


    var formData = JSON.stringify($("#myForm").serializeArray());

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/tasks/create",
        data: formData,
        contentType: "application/json",
        dataType: "json",
        success: function(data){
          console.log(data);
          console.log("Posted the data!");
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
  });


});*/

});
