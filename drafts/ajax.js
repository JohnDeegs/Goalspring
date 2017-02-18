var $testBtn = $('#testBtn');

$testBtn.click(function(){
  alert("Hello");
  console.log("Hello hello");

  var data = {};
  data.title = "John";
  data.message = "Deegan";

          $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
                contentType: 'application/json',
                        url: 'http://localhost:8080/profile',
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });
});
