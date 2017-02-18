function twoDigits(d) {
if(0 <= d && d < 10) return "0" + d.toString();
if(-10 < d && d < 0) return "-0" + (-1*d).toString();
return d.toString();
}

Date.prototype.toMysqlFormat = function() {
return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

var data = {};
data.task = $tName;
data.taskDate = Date.prototype.toMysqlFormat;
data.duration = $tDuration;
data.id = Math.floor((Math.random() * 1000000) + 1);

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
