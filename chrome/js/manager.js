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

var get_city = function(callback){
  var location = "";
  chrome.storage.local.get("location",function(result){
    location = result.location;
    if(location){
      $('#city')[0].innerHTML = location;
    }else{
      $('#city')[0].innerHTML = "臺北市";
    }
    callback();
  });

}

var get_weather = function(){

  if( localStorage.getItem("update_weather") == 0 ){
    var tmp = [];
    $.ajax({
        type: "GET",
        url: "http://api.managers.today:3000/weather",
        dataType: "json",
        success: function(json){
            var i = 0;
            $(json).each(function(){
              if( this.name === $('#city').html()){
                tmp.push(this.maxt);
                tmp.push(this.mint);
                tmp.push(this.wx);
                tmp.push(this.name);

                $("#maxt"+ i )[0].innerHTML = this.maxt;
                $("#mint"+ i)[0].innerHTML = this.mint;
                $("#wx" + i).attr("title" , this.wx );

                if( this.wx.match("多雲") || this.wx.match("陰") ){
                  $("#wx" + i ).attr("src" , "resource/img/weather/clouds-64.gif");
                }
                if( this.wx.match("短暫陣雨") || this.wx.match("短暫雨")){
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
              localStorage.setItem( "update_weather" , 1 );
              localStorage.setItem( "update_time" , new Date() );
            });
            var a = 0;
            for( var i = 0 ; i < tmp.length ; i++ ){
              if( i % 4 == 0 ){
                localStorage.setItem( "max_t" + a , tmp[i] );
                localStorage.setItem( "min_t" + a , tmp[i+1] );
                localStorage.setItem( "wx" + a , tmp[i+2] );
                localStorage.setItem( "city" + a, tmp[i+3] );
                a++;
              }
            }

        },
        error: function(){
          if( localStorage.getItem("max_t0") ){
            for( var i = 0 ; i < 3 ; i++ ){
              $("#maxt"+ i)[0].innerHTML = localStorage.getItem( "max_t" + i );
              $("#mint"+ i)[0].innerHTML = localStorage.getItem( "min_t" + i );
              $("#wx" + i).attr("title" , localStorage.getItem( "wx" + i ) );

              if( localStorage.getItem("wx" + i).match("多雲") || localStorage.getItem("wx" + i).match("陰") ){
                  $("#wx" + i ).attr("src" , "resource/img/weather/clouds-64.gif");
                }
                if( localStorage.getItem("wx" + i).match("短暫陣雨") || localStorage.getItem("wx" + i).match("短暫雨")){
                  $("#wx" + i ).attr("src" , "resource/img/weather/little-rain-64.gif");
                }
                if( localStorage.getItem("wx" + i).match("雷陣雨")){
                  $("#wx" + i ).attr("src" , "resource/img/weather/storm-64.gif");
                }
                if( localStorage.getItem("wx" + i).match("有雨")){
                  $("#wx" + i ).attr("src" , "resource/img/weather/rain-64.gif");
                }
                if( localStorage.getItem("wx" + i).match("晴")){
                  $("#wx" + i ).attr("src" , "resource/img/weather/sun-64.gif");
                }
                if( localStorage.getItem("wx" + i).match("晴時多雲") || localStorage.getItem("wx" + i).match("多雲時晴")){
                  $("#wx" + i ).attr("src" , "resource/img/weather/partly-cloudy-day-64.gif");
                }
                if( localStorage.getItem("wx" + i).match("多雲時晴偶陣雨")){
                  $("#wx" + i ).attr("src" , "resource/img/weather/chance-of-storm-64.gif");
                }
            }
          }else{
            for( var i = 0 ; i < 3 ; i++ ){
              $("#wx"+i).attr( "src" , "resource/img/weather/file-64.gif");
              $("#maxt"+i)[0].innerHTML = "無資料";
              $("#mint"+i)[0].innerHTML = "無資料";
            }
          }
        }
      });
    }else{
        for( var i = 0 ; i < 3 ; i++ ){
          $("#maxt"+ i)[0].innerHTML = localStorage.getItem("max_t" + i);
          $("#mint"+ i)[0].innerHTML = localStorage.getItem("min_t" + i );
          $("#wx" + i).attr("title" , localStorage.getItem( "wx" + i ) );

          if( localStorage.getItem("wx" + i).match("多雲") || localStorage.getItem("wx" + i).match("陰") ){
              $("#wx" + i ).attr("src" , "resource/img/weather/clouds-64.gif");
            }
            if( localStorage.getItem("wx" + i).match("短暫陣雨") || localStorage.getItem("wx" + i).match("短暫雨")){
              $("#wx" + i ).attr("src" , "resource/img/weather/little-rain-64.gif");
            }
            if( localStorage.getItem("wx" + i).match("雷陣雨")){
              $("#wx" + i ).attr("src" , "resource/img/weather/storm-64.gif");
            }
            if( localStorage.getItem("wx" + i).match("有雨")){
              $("#wx" + i ).attr("src" , "resource/img/weather/rain-64.gif");
            }
            if( localStorage.getItem("wx" + i).match("晴")){
              $("#wx" + i ).attr("src" , "resource/img/weather/sun-64.gif");
            }
            if( localStorage.getItem("wx" + i).match("晴時多雲") || localStorage.getItem("wx" + i).match("多雲時晴")){
              $("#wx" + i ).attr("src" , "resource/img/weather/partly-cloudy-day-64.gif");
            }
            if( localStorage.getItem("wx" + i).match("多雲時晴偶陣雨")){
              $("#wx" + i ).attr("src" , "resource/img/weather/chance-of-storm-64.gif");
            }
        }
      }
}

var get_sentence = function(){
  Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
  };
  update_sentence = new Date(localStorage.getItem("update_sentence"));
  current = new Date()
  if( !localStorage.getItem("sentence") || update_sentence.getDate() !== current.getDate() ){
    $.ajax({
        type: "GET",
        url: "http://api.managers.today:3000/sentence",
        dataType: "json",
        success: function(json){
          $(json).each(function(){
            localStorage.setItem("sentence",this.content);
            localStorage.setItem("author",this.author_chin_name);
            localStorage.setItem("title",this.author_title);
            var tmp_content;
            var rest_content;
            if( this.content.length > 40 ){
              tmp_content = this.content.split("，").slice(0,2).join('，');
              rest_content = this.content.split("，").slice(3).join('，');
              $("#today_sentence h2")[0].innerHTML = tmp_content + "<br>" + rest_content ;
            }else{
              $('#today_sentence h2')[0].innerHTML = this.content;
            }
            $('#today_sentence h3')[0].innerHTML = "《" + this.author_title +"》" + this.author_chin_name;
          });
          localStorage.setItem("update_sentence" , current);
        },
        error: function(){
          console.log("error happened");
          if(localStorage.getItem("sentence")){
            var tmp = localStorage.getItem("sentence");
            if( tmp.length > 40 ){
              tmp_content = tmp.split("，").slice(0,2).join('，');
              rest_content = tmp.split("，").slice(3).join('，');
              $("#today_sentence h2")[0].innerHTML = tmp_content + "<br>" + rest_content ;
            }else{
              $('#today_sentence h2')[0].innerHTML = tmp;
            }
            $('#today_sentence h3')[0].innerHTML = "《" + localStorage.getItem("title") +"》" + localStorage.getItem("author");
          }else{
            console.log("error happened");
          }
        }
    });
  }else{
    var tmp = localStorage.getItem("sentence");
      if( tmp.length > 40 ){
        tmp_content = tmp.split("，").slice(0,2).join('，');
        rest_content = tmp.split("，").slice(3).join('，');
        $("#today_sentence h2")[0].innerHTML = tmp_content + "<br>" + rest_content ;
      }else{
        $('#today_sentence h2')[0].innerHTML = tmp;
    }
    $('#today_sentence h3')[0].innerHTML = "《" + localStorage.getItem("title") +"》" + localStorage.getItem("author");
  }
}


var get_english = function(){
  update = new Date(localStorage.getItem("update_sentence"));
  current_time = new Date();
  if( !localStorage.getItem("vocabulary") || update.getDate() !== current_time.getDate() ){

    $.ajax({
      type: "GET",
      url: "http://api.managers.today:3000/english",
      dataType: "json",
      success: function(json){
        $(json).each(function(){
          $('.vocabulary-box h3')[0].innerHTML = this.vocabulary;
          $('.vocabulary-box h4')[0].innerHTML = this.chinese_meaning;
          $('.vocabulary-box h4')[1].innerHTML = this.transcription;
          //$('.vocabulary-box p')[0].innerHTML = this.chinese_content;
          localStorage.setItem( "vocabulary" , this.vocabulary );
          localStorage.setItem( "chinese_meaning" , this.chinese_meaning );
          localStorage.setItem( "transcription" , this.transcription );
          //localStorage.setItem( "chinese_content" , this.chinese_content );
        });
      },
      error: function(){
        console.log("error");
      }
    });

  }else{
    $('.vocabulary-box h3')[0].innerHTML = localStorage.getItem("vocabulary");
    $('.vocabulary-box h4')[0].innerHTML = localStorage.getItem("chinese_meaning");
    $('.vocabulary-box h4')[1].innerHTML = localStorage.getItem("transcription");
    //$('.vocabulary-box p')[0].innerHTML = localStorage.getItem("chinese_content");
  }
}

var get_weather_controller = function(){
   // convert millisecond to second
  var tmp  = Math.round( new Date(localStorage.getItem("update_time")).getTime() / 1000 );
  var current = Math.round( new Date().getTime() / 1000 );

  /*change flag for updating weather*/
  if( ( current - tmp ) > 21600 ){
    $.when(localStorage.setItem( "update_weather" , 0 )).then(get_weather);
  }else if( localStorage.getItem("city0") !== $('#city').html() ){
    console.log(localStorage.getItem("city0"));
    console.log($('#city').html());
    $.when(localStorage.setItem( "update_weather" , 0 )).then(get_weather);
  }else{
    get_weather();
  }
}

var initial = function(){
  get_city(function(){
    set_current_time();
    set_greeting_word();
    get_name();
    get_sentence();
    get_english();
    setInterval(set_current_time, 10000);
    setInterval(set_greeting_word, 3600000);
    get_weather_controller();
  });
}

jQuery(function($){
  initial();
  $($('.btn-group button')[0]).click(function(){
    $('#today_sentence').show();
    $('#today_sentence').siblings().hide();
  });

  $($('.btn-group button')[1]).click(function(){
    $('#learning-english').show();
    $('#learning-english').siblings().hide();
  });

  $($('.btn-group button')[2]).click(function(){
    $('#divination').show();
    $('#divination').siblings().hide();
  });


});
