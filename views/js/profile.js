$(document).ready(function(){

  //if the user has no stored data for this date already, then show the modal, if not then go straight to the page

  $.get("http://localhost:8080/tasks", function(data, status){
    JSON.stringify(data);
    $("#taskList").append(data);
  });

  var data = {
    name : "example",
    start : "1000-01-01 00:00:00",
    end : "1000-01-01 00:00:00"
  }

  $("button").click(function(){

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/create",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function(data){alert(data);},
        failure: function(errMsg) {
            alert(errMsg);
        }
  });
});

});
