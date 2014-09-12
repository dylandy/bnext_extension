var set_current_time = function(){
  var current = new Date;
  var year = current.getFullYear();
  var month = current.getMonth()+1;
  var day = current.getDate();
  var hour = current.getHours();
  var minute = current.getMinutes();

  var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

  //show time in correct format
  if( hour < 10){
    if( minute < 10){
      var time_result = "0" + hour.toString() + ":" + "0" + minute.toString();
    }
    var time_result = "0" + hour.toString() + ":" + minute.toString();
  }else if( minute < 10 && hour > 10 ){
    var time_result = hour.toString() + ":" + "0" + minute.toString();
  }else{
    var time_result = hour.toString() + ":" + minute.toString();
  }

  $('#current_time')[0].innerHTML = time_result;
  $('#current_date')[0].innerHTML = monthNames[ month -1 ] + " , " + day + " , " + year;

}

var set_greeting_word = function(){
  var current = new Date;
  var hour = current.getHours();

  if( hour > 5 && hour < 12 ){
    $('#greeting_word')[0].innerHTML = "早安！";
  }else if( hour >= 12 && hour < 14 ){
    $('#greeting_word')[0].innerHTML = "午安！";
  }else if( hour >= 14 && hour < 18 ){
    $('#greeting_word')[0].innerHTML = "下午好！";
  }else{
    $('#greeting_word')[0].innerHTML = "晚安！";
  }
}

jQuery(function($){
  set_current_time();
  setInterval(set_current_time, 60000);
  set_greeting_word();
});
