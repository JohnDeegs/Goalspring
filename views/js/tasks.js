//implements jquery
$(document).ready(function() {

    var createForm = $('#createForm');
    var sleepForm = $('#sleepForm');
    var schoolForm = $('#schoolForm');

    //Get the url

    var url = window.location.href;
    //console.log(url);

    //get the id of the day which is in the url

    let urlId = url.substr(url.length - 8);
    //console.log(urlId);

    //============================================================================
    //Posting the create data from to the db

    //importing time picker library
    $('.time').timepicker({
        'timeFormat': 'H:i',
        'scrollDefault': 'now'
    });

    //form
    createForm.on('submit', function(e) {
        e.preventDefault(); //prevents form from submitting before our changes

        //Declare Variables

        var userStartTime = $('#createSTime');
        var userFinishTime = $('#createETime');

        //==========================================================================
        //Time Validation
        //User cannot set the end time as happening before the start time.
        var sTime = $('#createSTime').val();
        var fTime = $('#createETime').val();

        var sCheck = sTime.substring(0, 2);
        var fCheck = fTime.substring(0, 2);

        sCheck = parseInt(sCheck);
        fCheck = parseInt(fCheck);

        if (sCheck > fCheck) {
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

        var mySqlDate = '' + year + ':' + month + ':' + day + '';


        //Translating the user inputs to our new MySQL translated strings
        userStartTime.val('' + mySqlDate + ' ' + sTime + ':00');
        userFinishTime.val('' + mySqlDate + ' ' + fTime + ':00');

        //Submit the form
        this.submit();

    });

    //form
    sleepForm.on('submit', function(e) {
        e.preventDefault(); //prevents form from submitting before our changes

        //Declare Variables

        var userStartTime = $('#sleepSTime');
        var userFinishTime = $('#sleepETime');

        //==========================================================================
        //Time Validation
        //User cannot set the end time as happening before the start time.
        var sTime = $('#sleepSTime').val();
        var fTime = $('#sleepETime').val();

        var sCheck = sTime.substring(0, 2);
        var fCheck = fTime.substring(0, 2);

        sCheck = parseInt(sCheck);
        fCheck = parseInt(fCheck);

        if (sCheck > fCheck) {
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

        var mySqlDate = '' + year + ':' + month + ':' + day + '';


        //Translating the user inputs to our new MySQL translated strings
        userStartTime.val('' + mySqlDate + ' ' + sTime + ':00');
        userFinishTime.val('' + mySqlDate + ' ' + fTime + ':00');

        //Submit the form
        this.submit();

    });

    //form
    schoolForm.on('submit', function(e) {
        e.preventDefault(); //prevents form from submitting before our changes

        //Declare Variables

        var userStartTime = $('#schoolSTime');
        var userFinishTime = $('#schoolETime');

        //==========================================================================
        //Time Validation
        //User cannot set the end time as happening before the start time.
        var sTime = $('#schoolSTime').val();
        var fTime = $('#schoolETime').val();

        var sCheck = sTime.substring(0, 2);
        var fCheck = fTime.substring(0, 2);

        sCheck = parseInt(sCheck);
        fCheck = parseInt(fCheck);

        if (sCheck > fCheck) {
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

        var mySqlDate = '' + year + ':' + month + ':' + day + '';


        //Translating the user inputs to our new MySQL translated strings
        userStartTime.val('' + mySqlDate + ' ' + sTime + ':00');
        userFinishTime.val('' + mySqlDate + ' ' + fTime + ':00');

        //Submit the form
        this.submit();

    });

    //================================================================
    // END OF FORMS
    //================================================================

    //assing the button to a variable for speed purposes

    var $analyzeBtn = $('#analyzeBtn');

    $analyzeBtn.click(function() {
        window.location.href = '/tasks/days/analyze/' + urlId + '';
    });

    //==================================================================
    // Before the sleep and school hours are submitted to the db
    // we insert the generic data along with the times

    //============================================================================

    //AI

    //variables
    var $generateBtn = $('#generateBtn');

    $.get('/tasks/days/weekly/previous/' + urlId + '', function(data, status) {

        var weekObj = data;

        console.log(weekObj);

        /*
        A function to add up all the elements of an int array
        This is used to calculate the total hours for each
        category
        */

        function addArrayHours(arr) {

            var total = 0;

            for (var j in arr) {
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

        var startHour;
        var finalHour;

        function getDuration(start, end) {

            startHour = start.substring(11, 13);

            finalHour = end.substring(11, 13);

            startHour = parseInt(startHour);
            finalHour = parseInt(finalHour);

            var duration = finalHour - startHour;

            return duration;
        }

        /*Declare variables out of the loop scope for
        speed purposes
         */

        var excerciseArr = [];
        var socialArr = [];
        var positivityArr = [];
        var studyArr = [];
        var sleepArr = [];
        var schoolArr = [];
        var otherArr = [];

        var fullStartDate;
        var fullFinalDate;
        var total;

        for (var i = 0; i < weekObj.length; i++) {

            if (weekObj[i]["category"] == "Excercise") {
                fullStartDate = weekObj[i]["start"];
                fullStartDate = moment(fullStartDate).format('DD-MM-YYYY HH:mm:ss');

                fullFinalDate = weekObj[i]["end"];
                fullFinalDate = moment(fullFinalDate).format('DD-MM-YYYY HH:mm:ss');

                total = getDuration(fullStartDate, fullFinalDate);

                excerciseArr.push(total);

            } else if (weekObj[i]["category"] == "Social") {
                fullStartDate = weekObj[i]["start"];
                fullStartDate = moment(fullStartDate).format('DD-MM-YYYY HH:mm:ss');
                fullFinalDate = weekObj[i]["end"];
                fullFinalDate = moment(fullFinalDate).format('DD-MM-YYYY HH:mm:ss');

                total = getDuration(fullStartDate, fullFinalDate);

                socialArr.push(total);

            } else if (weekObj[i]["category"] == "Positivity") {
                fullStartDate = weekObj[i]["start"];
                fullStartDate = moment(fullStartDate).format('DD-MM-YYYY HH:mm:ss');
                fullFinalDate = weekObj[i]["end"];
                fullFinalDate = moment(fullFinalDate).format('DD-MM-YYYY HH:mm:ss');

                total = getDuration(fullStartDate, fullFinalDate);

                positivityArr.push(total);

            } else if (weekObj[i]["category"] == "Study") {
                fullStartDate = weekObj[i]["start"];
                fullStartDate = moment(fullStartDate).format('DD-MM-YYYY HH:mm:ss');
                fullFinalDate = weekObj[i]["end"];
                fullFinalDate = moment(fullFinalDate).format('DD-MM-YYYY HH:mm:ss');

                total = getDuration(fullStartDate, fullFinalDate);

                studyArr.push(total);

            } else if (weekObj[i]["category"] == "Sleep") {
                fullStartDate = weekObj[i]["start"];
                fullStartDate = moment(fullStartDate).format('DD-MM-YYYY HH:mm:ss');
                fullFinalDate = weekObj[i]["end"];
                fullFinalDate = moment(fullFinalDate).format('DD-MM-YYYY HH:mm:ss');

                total = getDuration(fullStartDate, fullFinalDate);

                sleepArr.push(total);

            } else if (weekObj[i]["category"] == "School") {
                fullStartDate = weekObj[i]["start"];
                fullStartDate = moment(fullStartDate).format('DD-MM-YYYY HH:mm:ss');
                fullFinalDate = weekObj[i]["end"];
                fullFinalDate = moment(fullFinalDate).format('DD-MM-YYYY HH:mm:ss');

                total = getDuration(fullStartDate, fullFinalDate);

                schoolArr.push(total);

            } else if (weekObj[i]["category"] == "Other") {
                fullStartDate = weekObj[i]["start"];
                fullStartDate = moment(fullStartDate).format('DD-MM-YYYY HH:mm:ss');
                fullFinalDate = weekObj[i]["end"];
                fullFinalDate = moment(fullFinalDate).format('DD-MM-YYYY HH:mm:ss');

                total = getDuration(fullStartDate, fullFinalDate);

                otherArr.push(total);

            } else {
                console.log("returned");
                return;
            }
        }

        /*
          Using our addArrayHours function we can now assign
          the total category hours for each category to a
          variable
        */

        var excerciseHours = addArrayHours(excerciseArr);
        var socialHours = addArrayHours(socialArr);
        var positivityHours = addArrayHours(positivityArr);
        var sleepHours = addArrayHours(sleepArr);
        var schoolHours = addArrayHours(schoolArr);
        var studyHours = addArrayHours(studyArr);
        var otherHours = addArrayHours(otherArr);

        //console.log(excerciseHours);
        //console.log(socialHours);
        //console.log(productiveHours);

        //=============================================================

        /*
        Here we calculcate the percentages of the tasks current completed
        compared to what is reccommended from our findings. Whichever
        percentage is lower is set as a priority for generation of the
        day's tasks.
         */

        var recExcerciseHours = 7;
        var recSocialHours = 17;
        var recSleepHours = 49;
        var recPositivityHours = 7;
        var recStudyHours = 27;

        var result;

        function getHourPercentage(done, rec) {
            result = (done / rec) * 100;

            return result;
        }

        //Get the percentages for each of our categories and assing them to a variable

        var positivtyPerc = getHourPercentage(positivityHours, recPositivityHours);
        var socialPerc = getHourPercentage(socialHours, recSocialHours);
        var excercisePerc = getHourPercentage(excerciseHours, recExcerciseHours);
        var sleepPerc = getHourPercentage(sleepHours, recSleepHours);
        var studyPerc = getHourPercentage(studyHours, recStudyHours);

        console.log(positivtyPerc);
        console.log(socialPerc);
        console.log(excercisePerc);
        console.log(sleepPerc);
        console.log(studyPerc);
        //console.log(excercisePerc);

        /*
          Now we run another GET request to our server to fetch the data from
          the date specified in the URL a.k.a today's date. We go through the
          possible times that can be used and elimate already user inserted
          data using the durations of the already created tasks. The AI Agent
          will then have a list of possible task durations for which it can
          sort through and assign to various categories based on the percentage
          calculations earlier
        */

        $.get('/tasks/days/analyze/get/' + urlId + '', function(data, status) {

            //Get all the possible hour slots in a day in .5 increments

            var possbileTimes = [];
            var startHolder = [];
            var durationArr = [];
            var dayStartDate;
            var dayEndDate;
            var dayStartHour;
            var dayEndHour;

            for (var i = 0; i < 24; i += 0.5) {
                possbileTimes.push(i);
            }

            var dayObj = data;

            //console.log(possbileTimes);

            for (var i = 0; i < dayObj.length; i++) {
                dayStartDate = dayObj[i]["start"]
                dayStartDate = moment(dayStartDate).format('DD-MM-YYYY HH:mm:ss');
                dayEndDate = dayObj[i]["end"];
                dayEndDate = moment(dayEndDate).format('DD-MM-YYYY HH:mm:ss');

                //console.log(dayStartDate);
                //console.log(dayEndDate);

                var dayDuration = getDuration(dayStartDate, dayEndDate);

                dayDuration = dayDuration * 2;

                //console.log(dayDuration);

                dayStartHour = dayStartDate.substring(11, 13);

                if (dayStartHour[0] == "0") {
                    dayStartHour = dayStartHour[1];
                }

                dayStartHour = parseInt(dayStartHour);

                //console.log(typeof dayStartHour);
                //console.log(dayStartHour);

                startHolder.push(dayStartHour);

                for (var j = 0; j < possbileTimes.length; j++) {
                    //console.log(dayStartHour);
                    if (possbileTimes[j] === dayStartHour) {
                        possbileTimes.splice(j, dayDuration);
                    } else {
                        console.log("No match");
                    }
                }
            }

            console.log(possbileTimes);

            var possibleTimesNumber = possbileTimes.length;

            var taskBlockArr = [];

            var newArrs = [];

            //console.log(possibleTimesNumber);
            var splitArray = [];

            var blockArrs = []

            /*for (var i = 0; i < possbileTimes.length; i++) {
                if (possbileTimes[i + 1] - possbileTimes[i] !== 0.5) {

                    splitArray = possbileTimes.slice(0, i + 1);
                    blockArrs.push(splitArray);
                }
            }

            console.log(blockArrs);*/

              var newArr = [];
              var subArr = [];
              for (var i = 0; i <  possbileTimes.length; i++) {
                  subArr.push(possbileTimes[i]);
                  if (possbileTimes[i + 1] - possbileTimes[i] !== 0.5) {
                      newArr.push(subArr);
                      subArr = [];
                  }
              }

            console.log(newArr);

            //  var possibleTaskBlocks =

            //  console.log(dayStartDate);
        });

        //on click of the generate button do this.
        $generateBtn.on('click', function() {

            alert("generated clicked");

        });

    });


});
