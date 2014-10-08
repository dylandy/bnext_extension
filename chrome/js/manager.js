var time_format = "";
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
      $('#city')[0].innerHTML = "臺北市";
    }
  });
}

var get_weather = function(){
  $.ajax({
      type: "GET",
      url: "http://api.bnext.com.tw:3000/weather",
      dataType: "json",
      success: function(json){
          var i = 0;
          $(json).each(function(){
            if( this.name === $('#city').html()){
              $("#maxt"+ i )[0].innerHTML = this.maxt;
              $("#mint"+ i)[0].innerHTML = this.mint;

              $("#wx" + i).attr("title" , this.wx );

              if( this.wx.match("多雲") || this.wx.match("陰") ){
                $("#wx" + i ).attr("src" , "resource/img/weather/clouds-64.gif");
              }
              if( this.wx.match("短暫陣雨")){
                $("#wx" + i ).attr("src" , "resource/img/weather/little-rain-64.gif");
              }
              if( this.wx.match("雷陣雨")){
                $("#wx" + i ).attr("src" , "resource/img/weather/storm-64.gif");
              }
              if( this.wx.match("有雨")){
                $("#wx" + i ).attr("src" , "resource/img/weather/rain-64.gif");
              }
              if( this.wx.match("晴")){
                $("#wx" + i ).attr("src" , "resource/img/weather/sun-64.gif");
              }
              if( this.wx.match("晴時多雲") || this.wx.match("多雲時晴")){
                $("#wx" + i ).attr("src" , "resource/img/weather/partly-cloudy-day-64.gif");
              }
              if( this.wx.match("多雲時晴偶陣雨")){
                $("#wx" + i ).attr("src" , "resource/img/weather/chance-of-storm-64.gif");
              }
              i++;
            }
          });

          if( time_format == 0 ){
            $('#center_info').css('left' , "35%");
            $('.box').css("margin" , "0 8.5%");
          }else{
            $('.box').css("margin"  , "0 3.4%");
          }

      },
      error: function(){
        for( var i = 0 ; i < 3 ; i++ ){
          $("#wx"+i).attr( "src" , "resource/img/weather/file-64.gif");
          $("#maxt"+i)[0].innerHTML = "無資料";
          $("#mint"+i)[0].innerHTML = "無資料";

          if( time_format == 0 ){
            $('#center_info').css('left' , "35%");
            $(".box").css("margin" , "0 7.5%");
          }else{
            $(".box").css("margin" , "0 2%");
          }
        }
      }


  });
}


jQuery(function($){
  set_current_time();
  set_greeting_word();
  get_name();
  get_city();
  get_weather();

  setInterval(set_current_time, 10000);
  setInterval(set_greeting_word, 3600000);
});
