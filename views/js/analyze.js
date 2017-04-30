//implements jquery
$(document).ready(function() {

    var a;



    //Get the url

    var url = window.location.href;
    console.log(url);

    //get the id of the day which is in the url

    var urlId = url.substr(url.length - 8);
    console.log(urlId);

    var taskData = [];

    $.get('/tasks/days/analyze/get/' + urlId + '', function(data, status) {
        //Assign server data to variable;
        var obj = data;

        //loop through extracted data and get the category for all data
        for (var i = 0; i < obj.length; i++) {

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
                if (taskData[j] === what) {
                    count++;
                }
            }
            return count;
        }

        //We get the amount of times each category has been used

        var productiveCount = countInArray(taskData, "Productive");
        var excerciseCount = countInArray(taskData, "Excercise");
        var socialCount = countInArray(taskData, "Social");

        //Create a new chart data variable and push the data we have
        //collected from the database to this array.

        var barChartData = [];

        barChartData.push(productiveCount, excerciseCount, socialCount);

        //console.log(chartData);

        //Using the chart.js framework, we can now use this data for
        //data viz purposes

        var barCanvas = document.getElementById("barChart");

        var bar = {
            labels: ["Productive", "Excercise", "Social"],
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
            data: bar
        });

        //=====PIE CHART======//

        var pieData = [];

        var pieNames = [];

        var pieColors = [];

        var times = [];

        for (var i = 0; i < obj.length; i++) {

            console.log(obj);

            pieNames.push(obj[i]["name"])
            var start = obj[i]["start"];
            var end = obj[i]["end"];

            var startParts = start.split("");
            var startHour = ''+startParts[11]+''+startParts[12]+'';
            startHour = parseInt(startHour);

            var endParts = end.split("");
            var endHour = ''+endParts[11]+''+endParts[12]+'';
            endHour = parseInt(endHour);

            if(endHour > startHour){
              var difference = endHour - startHour;
              console.log(difference)
              times.push(difference);
            }else{
              return;
            }

            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);

            pieColors.push("rgb("+r+","+g+","+b+")");
        }

        console.log(times);
        console.log(pieNames);

        var pieCanvas = document.getElementById("pieChart");

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
