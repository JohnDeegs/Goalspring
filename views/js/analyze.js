//implements jquery
$(document).ready(function() {

    var a;

    //Get the url

    var url = window.location.href;

    //get the id of the day which is in the url

    var urlId = url.substr(url.length - 8);

    console.log("This file");

    var taskData = [];

    $.get('/tasks/days/analyze/get/'+ urlId +'', function(data, status) {
        //Assign server data to variable;
        var obj = data;
        var gmtObj;

        console.log(obj);

        var modStart;
        var modFinish;

        //loop through extracted data and get the category for all data
        for (var i = 0; i < obj.length; i++) {

          modStart = obj[i]["start"];
          modFinish = obj[i]["end"];

          var now = moment(modStart).format('D-MM-YYYY H:mm:ss');
          console.log(now);

            var a = obj[i]["category"];
            var category = obj[i].category;
            taskData.push(a);
        }

        console.log(taskData);

        //Function that takes in an array and the name of the category
        //and loops through the inputted array searching for matches to the
        //inputted what category. If a match is found, we increment the
        //count variable. At the end of the loop, return the value of the
        //count variable

        function countInArray(array, what) {
            var count = 0;
            for (var j = 0; j < array.length; j++) {
                if (array[j] === what) {
                    count++;
                }
            }
            return count;
        }

        //We get the amount of times each category has been used

        var positivityCount = countInArray(taskData, "Positivity");
        var excerciseCount = countInArray(taskData, "Excercise");
        var socialCount = countInArray(taskData, "Social");
        var studyCount = countInArray(taskData, "Study");
        var otherCount = countInArray(taskData, "Other");
        var sleepCount = countInArray(taskData, "Sleep");

        //Create a new chart data variable and push the data we have
        //collected from the database to this array.

        var barChartData = [];

        barChartData.push(positivityCount, excerciseCount, socialCount, studyCount, sleepCount, otherCount);

        //console.log(chartData);

        //Using the chart.js framework, we can now use this data for
        //data viz purposes

        var barCanvas = document.getElementById("barChart");

        var bar = {
            labels: ["Positivity", "Excercise", "Social", "Study", "Sleep", "Other"],
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

        //Using the canvas variable we assigned earlier, we can append our
        //chart to the

        var myBarChart = Chart.Bar(barCanvas, {
            data: bar,
            options: {
              legend: {
                display: false
              },
            }
        });

        //=====PIE CHART======//

        var pieData = [];

        var pieNames = [];

        var pieColors = [];

        var times = [];

        console.log("Hello");

        for (var i = 0; i < obj.length; i++) {

            console.log("Hello");

          pieNames.push(obj[i]["name"]);
          var start = obj[i]["start"];
          start = moment(start).format('D-MM-YYYY H:mm:ss');

          var end = obj[i]["end"];
          end = moment(end).format('D-MM-YYYY H:mm:ss');

          var startParts = start.split("");
          if(startParts[12] === ":"){
            startHour = '' + startParts[11] + '';
          }else{
            var startHour = '' + startParts[11] + '' + startParts[12] + '';
          }

          startHour = parseInt(startHour);

          var endParts = end.split("");
          if(endParts[12] === ":"){
            endHour = '' + endParts[11] + '';
          }else{
            var endHour = '' + endParts[11] + '' + endParts[12] + '';
          }

          endHour = parseInt(endHour);

          if (endHour > startHour) {
              var difference = endHour - startHour;
              times.push(difference);
          } else {
              console.log("Returned");
          }

          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);

          pieColors.push("rgb(" + r + "," + g + "," + b + ")");
        }

        console.log(times);
        console.log(pieNames);

        var pieCanvas = document.getElementById("pieChart");

        //pieCanvas.canvas.width = 300;
        //pieCanvas.canvas.height = 300;

        var mypie = {
            labels: pieNames,
            datasets: [{
                data: times,
                backgroundColor: pieColors,
                hoverBackgroundColor: pieColors
            }]
        };

        var myPieChart = new Chart(pieCanvas, {
          type: 'pie',
          data: mypie
        });

        console.log(pieData);



    });

});
