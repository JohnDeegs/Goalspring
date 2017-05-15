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
        var dropdown = $('#text2');

        var dropdownText = $('#text2 option:selected').text();

        dropdown.val(dropdownText);

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
        //var sleepPerc = getHourPercentage(sleepHours, recSleepHours);
        var studyPerc = getHourPercentage(studyHours, recStudyHours);



        console.log(positivtyPerc);
        console.log(socialPerc);
        console.log(excercisePerc);
        //console.log(sleepPerc);
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

            console.log(dayObj);

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
                    }
                }
            }

            console.log(possbileTimes);

            var possibleTimesNumber = possbileTimes.length;

            var taskBlockArr = [];

            var newArrs = [];

            //console.log(possibleTimesNumber);
            var splitArray = [];

            var blockArrs = [];
            var subArr = [];
            for (var i = 0; i < possbileTimes.length; i++) {
                subArr.push(possbileTimes[i]);
                if (possbileTimes[i + 1] - possbileTimes[i] !== 0.5) {
                    blockArrs.push(subArr);
                    subArr = [];
                }
            }

            console.log(blockArrs[1]);

            var percArray = [positivtyPerc, socialPerc, excercisePerc, studyPerc];

            var percObj = {
                "Positivity": positivtyPerc,
                "Social": socialPerc,
                "Excercise": excercisePerc,
                "Study": studyPerc
            };

            console.log(percObj);

            //sorting obj into highest

            var sortable = [];
            for (var key in percObj) {
                sortable.push([key, percObj[key]]);
            }

            sortable.sort(function(a, b) {
                return a[1] - b[1];
            });

            console.log(blockArrs[1]);

            console.log(sortable);

            //=====
            // Getting the largest value in obj

            var percArr = Object.keys(percObj).map(function(key) {
                return percObj[key];
            });

            var max = Math.max.apply(null, percArr);

            console.log(max);

            //====
            // Getting size of obj

            Object.size = function(obj) {
                var size = 0,
                    key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };

            var size = Object.size(percArr);

            console.log(size);

            //====
            //sort the possibilies into the largest time block first

            blockArrs.sort(function(a, b) {
                return b.length - a.length;
            });

            console.log(dayObj);

            var generateDate = dayObj[0]["start"];
            generateDate = moment(generateDate).format('YYYY-MM-DD HH:mm:ss');
            generateDate = generateDate.slice(0, 10);

            console.log(generateDate);
            console.log(sortable);

            console.log(blockArrs[0].slice(blockArrs[0].length - 5));

            var splitBlockArrs = []

            for(var i = 0; i < blockArrs.length; i++){
              if(blockArrs[i].length > 6){
                blockArrs[i] = blockArrs[i].splice(blockArrs[i].length - 5);
              }
            }


            for(var i = 0; i < blockArrs.length; i++){
              if(blockArrs[i][blockArrs[i].length - 1] % 1 != 0){
                blockArrs[i][blockArrs[i].length -1] = blockArrs[i][blockArrs[i].length -1] + 0.5;

                if(blockArrs[i][blockArrs[i].length -1] == 24){
                  blockArrs[i][blockArrs[i].length -1] = 00;
                }
              }

              if(blockArrs[i][0] % 1 != 0){
                var stringify = blockArrs[i][0].toString();
                stringify.split("");
                var end = stringify[stringify.length -1];
                if(end === "5"){
                  var newStr = stringify.replace("5", "");
                }

                var strNum = parseInt(newStr);

                blockArrs[i][0] = strNum;
                console.log(blockArrs[i][0]);
              }
            }

            console.log(blockArrs[1]);



            console.log(blockArrs);


            //on click of the generate button do this.
            $generateBtn.on('click', function() {

                var data = {};

                //alert(sortable[0][0]);

                for (var i = 0; i < 3; i++) {

                    data.name = "Edit name";
                    data.category = '' + sortable[i][0] + '';

                    //To ensure that the webpage displays the correct minutes if the task is a half hour task
                    if(blockArrs[i][0] % 1 != 0){
                      var stringify = blockArrs[i][0].toString();
                      stringify.split("");
                      var end = stringify[stringify.length -1];
                      if(end === "5"){
                        var newStr = stringify.replace("5", "");
                      }

                      var strNum = parseInt(newStr);

                      blockArrs[i][0] = strNum;

                      data.start = ''+generateDate+' '+blockArrs[i][0]+':30:00';
                    }else{
                      data.start = ''+generateDate+' '+blockArrs[i][0]+':00:00';
                    }

                    console.log(data.start);

                    data.end = ''+generateDate+' '+blockArrs[i][blockArrs[i].length - 1]+':00:00';

                    $.ajax({
                        type: 'POST',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        url: '/tasks/day/generate/create',
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });
                }

                console.log(data);

            });

        });

    });


});
