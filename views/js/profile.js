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

    //if theres no time selected for the start or finish, we return

    if(sTime === "" || fTime === ""){
      console.log("No time selected");
      return false;
    }

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

    //We create our MySql dates using the convertTime function

    var finalStart = convertTime(sTime);
    var finalFinish = convertTime(fTime);

    //Now lets do some error handling, convert the mySQL datetimes back to JS for examination

    function convertToJsDate(mySqlArg){
      //splits timestamp
      var t = mySqlArg.split(/[- :]/);

      var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

      return d;

    }

    console.log(convertToJsDate(finalStart));

    //Asign these variables with the MySqlTimeDate in JS Date time

    var test1 = convertToJsDate(finalStart);

    var test2 = convertToJsDate(finalFinish);

    //Get the value of the name of the task

    var name = $('#text1').val();

    //if the name is blank, then the task is not made and we return

    if(name === ""){
      console.log("You didn't enter a name!");
      return false;
    }

    //get the value of the category

    var category = $('#sel1').val();

    //if there is no category selected, then the task is not made and we return

    if(category === ""){
      console.log("There is no category selected");
      return false;
    }

    //if the start time is further in time than the finish time, the task is not made and we return

    //if this criteria is met, then the form is submitted.

    if(test1 >= test2){
      console.log("You can't go back in time Marty McFly!");
      return false;
    }else{
      $('#text2').val(finalStart);
      $('#text3').val(finalFinish);
      $('#sel').val(optionToString);

      $('#showForm').submit();
    }

  });

});
