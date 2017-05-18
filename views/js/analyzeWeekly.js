//implements jquery
$(document).ready(function() {

    //Get the url

    var url = window.location.href;

    //get the id of the day which is in the url

    var urlId = url.substr(url.length - 8);

    var taskData = [];

    $.get('/tasks/days/analyze/weekly/get/' + urlId + '', function(data, status) {
        var obj = data;
        console.log(obj);

        for (var i = 0; i < obj.length; i++) {
            var category = obj[i]["category"];
            taskData.push(category);
        }

        //Function that takes in an array and the name of the category
        //and loops through the inputted array searching for matches to the
        //inputted what category. If a match is found, we increment the
        //count variable. At the end of the loop, return the value of the
        //count variable

        function countInArray(array, what) {
            var count = 0;
            for (var j = 0; j < array.length; j++) {
                if (taskData[j] === what) {
                    count++;
                }
            }
            return count;
        }


        //We get the amount of times each category has been used

        var positivityCount = countInArray(taskData, "Positivity");
        var excerciseCount = countInArray(taskData, "Excercise");
        var socialCount = countInArray(taskData, "Social");
        var sleepCount = countInArray(taskData, "Sleep");
        var schoolCount = countInArray(taskData, "School");
        var otherCount = countInArray(taskData, "Other");

        //Create a new chart data variable and push the data we have
        //collected from the database to this array.

        var barChartData = [];

        barChartData.push(positivityCount, excerciseCount, socialCount, sleepCount, schoolCount, otherCount);


        //Using the chart.js framework, we can now use this data for
        //data viz purposes

        var barCanvas = document.getElementById("barChart");

        var bar = {
            labels: ["Positivty", "Excercise", "Social", "Sleep", "School", "Social", "Other"],
            datasets: [{
                label: "Tasks:",
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                data: barChartData,
            }]
        };

        var barChartOptions = {
            // All of my other bar chart option here
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false
            },
        }

        //Using the canvas variable we assigned earlier, we can append our
        //chart to the

        var myBarChart = Chart.Bar(barCanvas, {
            data: bar,
            options: barChartOptions
        });

        console.log("Hello world");

        //=====PIE CHART======//

        var pieData = [];

        var pieNames = [];

        var pieColors = [];

        var times = [];

        for (var i = 0; i < obj.length; i++) {

          console.log("Hello world");

            pieNames.push(obj[i]["name"]);
            var start = obj[i]["start"];
            start = moment(start).format('D-MM-YYYY H:mm:ss');

            var end = obj[i]["end"];
            end = moment(end).format('D-MM-YYYY H:mm:ss');

            var startParts = start.split("");
            if (startParts[12] === ":") {
                startHour = '' + startParts[11] + '';
            } else {
                var startHour = '' + startParts[11] + '' + startParts[12] + '';
            }

            startHour = parseInt(startHour);

            var endParts = end.split("");
            if (endParts[12] === ":") {
                endHour = '' + endParts[11] + '';
            } else {
                var endHour = '' + endParts[11] + '' + endParts[12] + '';
            }

            endHour = parseInt(endHour);

            if (endHour > startHour) {
                var difference = endHour - startHour;
                times.push(difference);
            } else {
              console.log("returned");
              
            }

            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);

            pieColors.push("rgb(" + r + "," + g + "," + b + ")");
        }

        console.log("Hello world");

        var pieCanvas = document.getElementById("pieChart");

        //pieCanvas.canvas.width = 300;
        //pieCanvas.canvas.height = 300;

        console.log(times)

        var mypie = {
            labels: pieNames,
            datasets: [{
                data: times,
                backgroundColor: pieColors,
                hoverBackgroundColor: pieColors
            }]
        };

        /*window.onload = function() {
            setTimeout(function() {
                var myPieChart = document.getElementById("pieCanvas").getContext("2d");
                window.myLine = new Chart(myPieChart).Pie(mypie, {
                    responsive: true
                });
            }, 1000);

        }*/

        var myPieChart = new Chart(pieCanvas, {
            type: 'pie',
            data: mypie
        });

        //================END OF PIE DATA=====================================//

        //====================================================================//
        //START OF LINE Chart
        //LINE CHART WILL SHOW USER USAGE OVER THE DAYS OF THE WEEK

        var dayDates = [];
        var dayNums = [];
        var dayOccurances = [];
        var counts = {};

        var a = [];
        var b = [];
        var prev;

        for (var i = 0; i < obj.length; i++) {
            var start = obj[i]["start"];
            start = moment(start).format('D-MM-YYYY H:mm:ss');
            start = start.substr(0, 10);
            dayDates.push(start);
        }

        for (var i = 0; i < dayDates.length; i++) {

            if (dayDates[i] !== prev) {
                dayOccurances.push(1);
            } else {
                dayOccurances[dayOccurances.length - 1]++;
            }
            prev = dayDates[i]
        }


        function remove_duplicates(arr) {
            var seen = {};
            var uniqueArr = [];

            for (var i = 0; i < arr.length; i++) {
                if (!(arr[i] in seen)) {
                    uniqueArr.push(arr[i]);
                    seen[arr[i]] = true;
                }
            }

            return uniqueArr;
        }

        dayDates = remove_duplicates(dayDates);

        var lineDiv = document.getElementById("lineChart");

        var lineData = {
            labels: dayDates,
            datasets: [{
                label: "Tasks This Day:",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: dayOccurances,
                spanGaps: false,
            }]
        };

        var lineChartOptions = {
            // All of my other bar chart option here
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

        var myLineChart = new Chart(lineDiv, {
            type: 'line',
            data: lineData,
            options: lineChartOptions
        });

    });



});
