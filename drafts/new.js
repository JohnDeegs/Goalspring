//implements jquery
$(document).ready(function () {
  var mysql = require('mysql');
  var dbconfig = require('./connection');
  var connection = mysql.createConnection(gendbconfig.connection);

  var $analyzeBtn = $('#analyzeBtn');

  $analyzeBtn.click(function(){
        alert("The paragraph was clicked.");
  });

});
