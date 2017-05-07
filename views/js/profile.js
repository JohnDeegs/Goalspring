$(document).ready(function() {



    //loop for displaying our next 7 days in sequence
    for (var i = 0; i < 7; i++) {

        var dateArray = [];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        var $divBlock = $('#taskSelector');

        //get current date
        var someDate = new Date();

        var numberOfDaysToAdd = i;
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1;
        var day = someDate.getDay();

        var y = someDate.getFullYear();

        if (day === 0) {
            day = days[6]
        } else if (day === 1) {
            day = days[0]
        } else if (day === 2) {
            day = days[1]
        } else if (day === 3) {
            day = days[2]
        } else if (day === 4) {
            day = days[3]
        } else if (day === 5) {
            day = days[4]
        } else if (day === 6) {
            day = days[5]
        } else {
            alert("Error");
            return false;
        }

        //  console.log(day);

        if (mm === 1) {
            mm = months[0]
        } else if (mm === 2) {
            mm = months[1]
        } else if (mm === 3) {
            mm = months[2]
        } else if (mm === 4) {
            mm = months[3]
        } else if (mm === 5) {
            mm = months[4]
        } else if (mm === 6) {
            mm = months[5]
        } else if (mm === 7) {
            mm = months[6]
        } else if (mm === 8) {
            mm = months[7]
        } else if (mm === 9) {
            mm = months[8]
        } else if (mm === 10) {
            mm = months[9]
        } else if (mm === 11) {
            mm = months[10]
        } else if (mm === 12) {
            mm = months[11]
        } else {
            alert("Error!");
            return false;
        }

        //bring these variables into a format that we can display to the user
        var monthNumber = someDate.getMonth() + 1;
        var dayNumber = someDate.getDate();
        var formattedDate = dd + '-' + monthNumber + '-' + y;

        if (dayNumber < 10) {
            dayNumber = '0' + dayNumber + '';
        }

        if (monthNumber < 10) {
            monthNumber = '0' + monthNumber + '';
        }

        //console.log(dd);
        //  console.log(days);

        var taskCount;

        $divBlock.append('<div class="col-sm-4"><a id="dayLink" href="/tasks/day/' + dayNumber + '' + monthNumber + '' + y + '"><div id="dayBlock"><div id="dayNumber">' + dd + '</div><div id="monthName">' + mm + ' ' + y + '</div><div id="dayName">' + day + '</div></div></a></div>');

        //<div id="textWrapper"><p id="content">Tasks Set:</p></div>
    }

    var analyzeDate = new Date();

    analyzeDate.setDate(analyzeDate.getDate());

    var aDate = analyzeDate.getDate();
    var aMonth = analyzeDate.getMonth() + 1;
    var aDay = analyzeDate.getDay();

    var aYear = analyzeDate.getFullYear();

    if (aDate < 10) {
        aDate = '0' + aDate + '';
    }

    if (aMonth < 10) {
        aMonth = '0' + aMonth + '';
    }

    var $infoBtns = $('#infoBtns');

    $infoBtns.append('<a href="/tasks/days/analyze/weekly/' + aDate + '' + aMonth + '' + aYear + '"><button class="btn btn-success">Weekly</button></a><button class="btn btn-success">All-Time</button>');




    //  console.log(dateArray);



    /*$(".0").click(function(){
      alert("zero");
    })

    $(".1").click(function(){
      alert("one");
    })*/

    //$divBlock.click(function(){
    //console.log($divBlock.text());
    //  })

    /*$.ajax({
        url : "/",
        type: "POST",
        data: JSON.stringify(dateArray),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(){
            console.log("Pure jQuery Pure JS object");
        }
    });
*/
});
