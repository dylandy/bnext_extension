var set_current_time = function(){
  var current = new Date;
  var year = current.getFullYear();
  var month = current.getMonth()+1;
  var hour = current.getHours();
  var minute = current.getMinutes();
  $('#current_time')[0].innerHTML = hour.toString() + ":" + minute.toString();
}
jQuery(function($){
  set_current_time();
});
