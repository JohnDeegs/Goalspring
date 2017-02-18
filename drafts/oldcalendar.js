//implements jquery
$(document).ready(function () {
  //array of months stored in variable
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //assign varriable to JS build in date object
  var d = new Date();
  //ensuring that the DOM is quicker we store the login form selector within a variable
  var form = $('#taskForm')
  //again for DOM performance we assing the user's inputted values to variables
  var $tName = "";
  var $tDuration = 0;
  var $cStudy = $('cStudy');
  var $cExcercise = $('cExcercise');
  var $cSocial = $('cSocial');
  //stores the identity of the selected task category later on
  var cVal = "";
  //This array is used to store what category our user has selected their task to go into, used for analysis later
  var categoryArray = [];

  var $Schedule = $('#userSchedule');

  var $removeBtn = $('#removeBtn');

  var $analyzeBtn = $('#analyzeBtn');

  var $studyComments = $('#studyComments');

  var $excerciseComments = $('#excerciseComments');

  var $socialComments = $('#socialComments');

  var socialArray = [];

  var excerciseArray = [];

  var studyArray = [];

//sets the date to the current date plus 1
  d.setDate(d.getDate()+1);

  //appends to the monthName ID within the html, d.getMontsh returns the month number and we return the string at index of that number from the monthNames array.
  //we can also get the current year easily by calling the getFullYear function from the Date object.
  $("#monthName").html(''+d.getDate()+' '+monthNames[d.getMonth()]+' '+d.getFullYear()+'');

  form.on('submit', function(e) {
    e.preventDefault(); //prevents form from submitting before our changes

    //Get the user input
    $tName = $('input[name="task"]').val();
    $tDuration = $('input[name="duration"]').val();

    //We get the value of the selected radio button category
    var cVal = $("input[name=category]:checked").attr("data-value").toString();

    if(cVal === "Study"){
      //Append user inputs to schedule
      $Schedule.append('<tr id="studyRow" style="background-color: #428bca"><td> '+$tDuration+'</td><td><i class="fa fa-book" aria-hidden="true"></i> '+$tName+'</td></tr>');
      studyArray.push($tDuration);
    }else if(cVal === "Excercise"){
      $Schedule.append('<tr id="excerciseRow" style="background-color: #f0ad4e"><td> '+$tDuration+'</td><td><i class="fa fa-futbol-o" aria-hidden="true"></i> '+$tName+'</td></tr>');
      excerciseArray.push($tDuration);
    }else{
      $Schedule.append('<tr id="socialRow" style="background-color: #449d44"><td> '+$tDuration+'</td><td><i class="fa fa-glass" aria-hidden="true"></i> '+$tName+'</td></tr>');
      socialArray.push($tDuration);
    }

    categoryArray.push(cVal);

    //submit our changes
    $form.submit();
  });

  $removeBtn.click(function(){
    $('#userSchedule tr:last').remove();
  });

  $analyzeBtn.click(function(){
    var studyTotal = 0;
    var excerciseTotal = 0;
    var socialTotal = 0;

    for(var i = 0; i < studyArray.length; i++){
      studyTotal += studyArray[i];
    }

    for(var i = 0; i < excerciseArray.length; i++){
      excerciseTotal += excerciseArray[i];
    }

    for(var i = 0; i < socialArray.length; i++){
      socialTotal += socialArray[i];
    }

    if(studyArray.length == 0 && excerciseArray.length == 0 && socialArray.length == 0){
      alert("Your schedule is empty!");
    }

    if(studyArray.length == 0 || studyTotal < 3){
      $studyComments.html('<li>You are not doing enough Study today. Please consider adding some productive activities to the list.</li><li>Most students at High School level study for up to 3 hours per day.</li><li>College and third level students reccomend up to 5 hours per day.</li>');
    }else if(studyTotal > 8){
      $studyComments.html('<li>Be careful! You are studying too much today, we reccomend that you slow down unless its urgent!</li><li>According to <a href="https://www.reference.com/health/harmful-effects-studying-much-afd5e4cbd8304901">reference.com</a>, too much studying can result in elevated stress and social alienation</li>');
    }else{
      $studyComments.html('<li style="list-style: none;"><i class="fa fa-check fa-5x" aria-hidden="true"></i></li>');
    }

    if(excerciseArray.length == 0 || excerciseTotal <= 1){
      $excerciseComments.html('<li>You are not doing enough Excercise today. Please consider adding some active activities to the list.</li><li>According to the <a href="https://www.hsph.harvard.edu/nutritionsource/2013/11/20/physical-activity-guidelines-how-much-exercise-do-you-need/">Harvard School of Public Health</a>, the average adult should be excercising for 150 minutes per week.</li>');
    }else if(excerciseTotal > 5){
      $excerciseComments.html('<li>You are doing a lot of Excercise. Consider taking it easy tomorrow!</li><li>According to <a href="http://www.webmd.com/men/features/exercise-addiction#1">webmd.com</a>, "Too much exercise can lead to injuries, exhaustion, depression, and suicide. It can also cause lasting physical harm."</li>');
    }else{
      $excerciseComments.html('<li style="list-style: none;"><i class="fa fa-check fa-5x" aria-hidden="true"></i></li>');
    }

    if(socialArray.length == 0 || socialTotal <= 1){
      $socialComments.html('<li>You are doing enough Socializing today. Please consider assing some social activities to the list.</li>According to <a href="http://ie.reachout.com/getting-help/face-to-face-help/things-you-need-to-know/benefits-of-talking-to-someone/">reachout.org</a>, there are mental health benefits from talking to people that are close to you.</li><li>Mindfullness counts!</li>');
    }else if(socialTotal > 5){
      $socialComments.html('<li>Well Mr.Popular, you might want to think about cutting down on your socialising for tomorrow!</li><li>If you are struggling to get starting excercise, a good place to start is the couch to 5k running plan <a href="http://www.coolrunning.com/engine/2/2_3/181.shtml">here</a></li><li>View the subreddit <a href="www.reddit.com/r/getStudying">r/getStudying</a> for hints and tips to kick start your studying.</li>');
    }else{
      $socialComments.html('<li style="list-style: none;"><i class="fa fa-check fa-5x" aria-hidden="true"></i></li>');
    }

  });

})
