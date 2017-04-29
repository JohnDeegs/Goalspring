//implements jquery
$(document).ready(function() {

    var a;



    //Get the url

    var url = window.location.href;
    console.log(url);

    //get the id of the day which is in the url

    var urlId = url.substr(url.length - 8);
    console.log(urlId);

    var chartDataInt = [];

    $.get('/tasks/days/analyze/get/' + urlId + '', function(data, status) {
        var obj = data;

        for (var i = 0; i < obj.length; i++) {

            var a = obj[i]["category"];
            var category = obj[i].category;
            chartDataInt.push(a);
        }

        var finalCount;

        console.log(chartDataInt);

        function countInArray(array, what) {
            var count = 0;
            for (var j = 0; j < array.length; j++) {
                if (chartDataInt[j] === what) {
                    count++;
                }
            }
            return count
        }

        var productiveCount = countInArray(chartDataInt, "Productive");

        var arr = [];

        arr.push(productiveCount);

        var a = countInArray(chartDataInt, "Productive");
        var b = countInArray(chartDataInt, "Excercise");
        var c = countInArray(chartDataInt, "Social");

        var chartData = [];

        chartData.push(a, b, c);

        console.log(chartData);

        console.log(a);

        console.log(arr);

        var canvas = document.getElementById("chart");

        var mydata = {
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
                data: chartData,
            }]
        };

        var myBarChart = Chart.Bar(canvas, {
            data: mydata
        });

    });



});

/**/

//chartDataInt.push("Excercise");

//chartDataInt.sort();
