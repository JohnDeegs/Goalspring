$(document).ready(function(){

  //if the user has no stored data for this date already, then show the modal, if not then go straight to the page

  $.get("http://localhost:8080/tasks/list", function(data, status){
    //selects the json+what i want
    var obj = data;
    $("#taskList").append(obj[0].name);
  });



  $("button").click(function(){

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/tasks/create",
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
