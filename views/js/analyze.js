//implements jquery
$(document).ready(function() {



    //Get the url

    var url = window.location.href;
    console.log(url);

    //get the id of the day which is in the url

    var urlId = url.substr(url.length - 8);
    console.log(urlId);

    var chartDataInt = [];

    $.get('/tasks/days/analyze/get/'+urlId+'', function(data, status){
      var obj = data;

      for (var i = 0; i < obj.length; i++) {

        var a = obj[i]["category"];
        var category = obj[i].category;
        chartDataInt.push(a);
      }

      var finalCount;

      console.log(chartDataInt);

      function countInArray(array, what){
        var count = 0;
        for(var j = 0; j < array.length; j++){
          if(chartDataInt[j] === what){
            count++;
          }
        }
         return count
      }

      console.log(countInArray(chartDataInt, "Productive"));


    });



});

/**/

//chartDataInt.push("Excercise");

//chartDataInt.sort();
