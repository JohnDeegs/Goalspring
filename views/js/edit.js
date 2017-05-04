$(document).ready(function(){

  var form = $('#showForm');
  var date = $('#todayDate').text();
  var dateHolder = $('#todayDate');

  //var displayTime = time.substring(16, 24);

  //$('#startTime').html('<p>'+displayTime+'</p>');

  //activates the time picker JQuery plugin for our form in order to edit the time more smoothly

  $('.time').timepicker({'timeFormat': 'H:i', 'scrollDefault': 'now'});

  date = date.substring(0,15);

  dateHolder.html(date);

  console.log(date);


  form.on('submit', function(e) {
    e.preventDefault(); //prevents form from submitting before our changes

    var userStartTime = $('#sTime');
    var userFinishTime = $('#eTime');

    //Validation
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

    // End of Validation

    //Formatting for mySQL datetime


    var day = date.substring(8, 10);
    var month = date.substring(4, 7);
    var year = date.substring(11, 15);

    if(month === "Jan"){
      var month = "01";
    }else if(month === "Feb"){
      var month = "02";
    }else if(month === "Mar"){
      var month = "03";
    }else if(month === "Apr"){
      var month = "04";
    }else if(month === "May"){
      var month = "05"
    }else if(month === "Jun"){
      var month = "06"
    }else if(month === "Jul"){
      var month = "07"
    }else if(month === "Aug"){
      var month = "08"
    }else if(month === "Sep"){
      var month = "09"
    }else if(month === "Oct"){
      var month = "10"
    }else if(month === "Nov"){
      var month = "11"
    }else if(month === "Dec"){
      var month = "12"
    }

    var mySqlDate = ''+year+':'+month+':'+day+'';

    userStartTime.val(''+mySqlDate+' '+sTime+':00');
    userFinishTime.val(''+mySqlDate+' '+fTime+':00');

    console.log(userStartTime);
    console.log(userFinishTime);

    this.submit();

    //$('#taskFormat').append('<div id="whitespace"></div>');
  });

});
