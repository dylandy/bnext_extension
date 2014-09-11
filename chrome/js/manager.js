var set_current_time = function(){
  var current = new Date;
  var year = current.getFullYear();
  var month = current.getMonth()+1;
  var hour = current.getHours();
  var minute = current.getMinutes();

  //show time in correct format
  if( hour.toString().length == 1){
    if( minute.toString().length == 1){
      var time_result = "0" + hour.toString() + ":" + "0" + minute.toString();
    }
    var time_result = "0" + hour.toString + ":" + minute.toString();
  }else if( minute.toString().length == 1 && hour.toString().length != 1){
    var time_result = "0" + hour.toString() + ":" + minute.toString();
  }else{
    var time_result = hour.toString() + ":" + minute.toString();
  }

  $('#current_time')[0].innerHTML = time_result;
}
jQuery(function($){
  set_current_time();
});
