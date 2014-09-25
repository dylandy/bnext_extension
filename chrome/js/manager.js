var set_current_time = function(){
  var current = new Date;
  var year = current.getFullYear();
  var month = current.getMonth()+1;
  var day = current.getDate();
  var hour = current.getHours();
  var minute = current.getMinutes();

  var monthNames = [ "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月" ];

  //get 12/24 format
  var time_format = "";
  chrome.storage.local.get("time_format" , function(result){
    time_format = result.time_format;

    //show time in correct format
    if( time_format == 0 ){
      if( hour < 12){
        if( minute < 10){
          var time_result = "0" + hour.toString() + ":" + "0" + minute.toString() + "AM";
        }else if( hour < 10){
          var time_result = "0" + hour.toString() + ":" + minute.toString() + "AM";
        }else if( hour >= 10 ){
          var time_result = hour.toString() + ":" + minute.toString() + "AM";
        }
      }else{
        if( (hour - 12 ) > 10 && minute < 10 ){
          var time_result = (hour - 12).toString() + ":" + "0" + minute.toString() + "PM";
        }else if ( (hour - 12 ) < 10 &&  minute < 10 ){
          var time_result = "0" + (hour - 12).toString() + ":" + "0" + minute.toString() + "PM";
        }else if( (hour - 12) < 10 && minute > 10 ){
          var time_result = "0" + (hour - 12).toString() + ":" + minute.toString() + "PM";
        }else if( (hour - 12) >= 10 && minute > 10 ){
            var time_result = (hour - 12).toString() + ":" + minute.toString() + "PM";
        }
      }
    }else{
      if( hour < 10){
        if( minute < 10){
          var time_result = "0" + hour.toString() + ":" + "0" + minute.toString();
        }
        else{
          var time_result = "0" + hour.toString() + ":" + minute.toString();
        }
      }else if( minute < 10 && hour > 10 ){
        var time_result = hour.toString() + ":" + "0" + minute.toString() ;
      }else{
        var time_result = hour.toString() + ":" + minute.toString();
      }
    }

    $('#current_time')[0].innerHTML = time_result;


    //re-adjust the center infomation after add "AM/PM" info on it
    if( time_format == 0 ){
      $('#center_info').css('left' , "35%");
    }
    else{
      $('#center_info').css('left' , "36%");
    }
  });


  $('#current_date')[0].innerHTML = monthNames[ month -1 ] + " , " + day + "日" + " , " + year;
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

var get_name = function(){
  var my_name = "";
  chrome.storage.local.get("my_name" , function(result){
    my_name = result.my_name;
    if(my_name){
      $('#name')[0].innerHTML = my_name;
    }else{
      $('#name')[0].innerHTML = "使用者";
    }
  });
}

var get_city = function(){
  var location = "";
  chrome.storage.local.get("location",function(result){
    location = result.location;
    if(location){
      $('#city')[0].innerHTML = location;
    }else{
      $('#city')[0].innerHTML = "台北市";
    }
  });
}


jQuery(function($){
  set_current_time();
  set_greeting_word();
  get_name();
  get_city();

  setInterval(set_current_time, 10000);
  setInterval(set_greeting_word, 3600000);
});
