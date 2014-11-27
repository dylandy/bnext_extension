var time_format = "";

var set_current_time = function () {
  var current = new Date;
  var year = current.getFullYear();
  var month = current.getMonth() + 1;
  var day = current.getDate();
  var hour = current.getHours();
  var minute = current.getMinutes();

//  var monthNames = ["一月", "二月", "三月", "四月", "五月", "六月",
//    "七月", "八月", "九月", "十月", "十一月", "十二月"];

  //get 12/24 format

  chrome.storage.local.get("time_format", function (result) {
    time_format = result.time_format;

    //show time in correct format
    if (time_format == 0) {
      if (hour < 12) {
        if (minute < 10) {
          var time_result = "0" + hour.toString() + ":" + "0" + minute.toString() + "AM";
        } else if (hour < 10) {
          var time_result = "0" + hour.toString() + ":" + minute.toString() + "AM";
        } else if (hour >= 10) {
          var time_result = hour.toString() + ":" + minute.toString() + "AM";
        }
      } else {
        if ((hour - 12) > 10 && minute < 10) {
          var time_result = (hour - 12).toString() + ":" + "0" + minute.toString() + "PM";
        } else if ((hour - 12) < 10 && minute < 10) {
          var time_result = "0" + (hour - 12).toString() + ":" + "0" + minute.toString() + "PM";
        } else if ((hour - 12) < 10 && minute > 10) {
          var time_result = "0" + (hour - 12).toString() + ":" + minute.toString() + "PM";
        } else if ((hour - 12) >= 10 && minute > 10) {
          var time_result = (hour - 12).toString() + ":" + minute.toString() + "PM";
        }
      }
    } else {
      if (hour < 10) {
        if (minute < 10) {
          var time_result = "0" + hour.toString() + ":" + "0" + minute.toString();
        } else {
          var time_result = "0" + hour.toString() + ":" + minute.toString();
        }
      } else if (minute < 10 && hour > 10) {
        var time_result = hour.toString() + ":" + "0" + minute.toString();
      } else {
        var time_result = hour.toString() + ":" + minute.toString();
      }
    }

    $('#current_time')[0].innerHTML = time_result;

  });


  $('#current_date')[0].innerHTML = month + " , " + day + " , " + year;
}

var set_greeting_word = function () {
  var current = new Date;
  var hour = current.getHours();

  if (hour > 5 && hour < 12) {
    $('#greeting_word')[0].innerHTML = "早安！";
  } else if (hour >= 12 && hour < 14) {
    $('#greeting_word')[0].innerHTML = "午安！";
  } else if (hour >= 14 && hour < 18) {
    $('#greeting_word')[0].innerHTML = "你好！";
  } else {
    $('#greeting_word')[0].innerHTML = "晚安！";
  }
}

var get_name = function () {
  var my_name = "";
  chrome.storage.local.get("my_name", function (result) {
    my_name = result.my_name;
    if (my_name) {
      $('#name')[0].innerHTML = my_name;
    } else {
      $('#name')[0].innerHTML = "使用者";
    }
  });
}

var get_city = function (callback) {
  var location = "";
  chrome.storage.local.get("location", function (result) {
    location = result.location;
    if (location) {
      $('#city')[0].innerHTML = location;
    } else {
      $('#city')[0].innerHTML = "臺北市";
    }
    callback();
  });

}

var get_weather = function () {
  if (localStorage.getItem("update_weather") == 0){
    $.ajax({
      type: "GET",
      url: "http://api.managers.today:3000/weather",
      dataType: "json",
      success: function (json) {
        console.log(123);
        var counter = 0;
        $(json).each(function () {
          if ( this.name === $('#city').html() && counter < 1 ) {
            localStorage.setItem("max_t", this.maxt);
            localStorage.setItem("min_t", this.mint);
            localStorage.setItem("wx", this.wx);
            localStorage.setItem("city", this.name);
            console.log(this.maxt);
            console.log(this.mint);
            console.log(this.wx);
            console.log(this.name);

            $("#maxt")[0].innerHTML = this.maxt;
            $("#mint")[0].innerHTML = this.mint;
            $("#wx").attr("title", this.wx);

            if (this.wx.match("多雲") || this.wx.match("陰")) {
              $("#wx").attr("src", "resource/img/weather-icon/cloudy.png");
            }
            if (this.wx.match("短暫陣雨") || this.wx.match("短暫雨")) {
              $("#wx").attr("src", "resource/img/weather-icon/heavy-rain.png");
            }
            if (this.wx.match("雷陣雨")) {
              $("#wx").attr("src", "resource/img/weather-icon/storm+rain.png");
            }
            if (this.wx.match("有雨")) {
              $("#wx").attr("src", "resource/img/weather-icon/sun+rain-2.png");
            }
            if (this.wx.match("晴")) {
              $("#wx").attr("src", "resource/img/weather-icon/sunny.png");
            }
            if (this.wx.match("晴時多雲") || this.wx.match("多雲時晴")) {
              $("#wx").attr("src", "resource/img/weather-icon/sun+cloudy.png");
            }
            if (this.wx.match("多雲時晴偶陣雨")) {
              $("#wx").attr("src", "resource/img/weather-icon/sunny+cloudy+shower.png");
            }
            counter++;
          }
          localStorage.setItem("update_weather", 1);
          localStorage.setItem("update_time", new Date());
        });

      },
      error: function () {
        if (localStorage.getItem("max_t")) {
            $("#maxt")[0].innerHTML = localStorage.getItem("max_t" );
            $("#mint")[0].innerHTML = localStorage.getItem("min_t" );
            $("#wx").attr("title", localStorage.getItem("wx" ));

            if (localStorage.getItem("wx").match("多雲") || localStorage.getItem("wx").match("陰")) {
              $("#wx").attr("src", "resource/img/weather-icon/cloudy.png");
            }
            if (localStorage.getItem("wx").match("短暫陣雨") || localStorage.getItem("wx").match("短暫雨")) {
              $("#wx").attr("src", "resource/img/weather-icon/heavy-rain.png");
            }
            if (localStorage.getItem("wx").match("雷陣雨")) {
              $("#wx").attr("src", "resource/img/weather-icon/storm+rain.png");
            }
            if (localStorage.getItem("wx").match("有雨")) {
              $("#wx").attr("src", "resource/img/weather-icon/sun+rain-2.png");
            }
            if (localStorage.getItem("wx").match("晴")) {
              $("#wx").attr("src", "resource/img/weather-icon/sunny.png");
            }
            if (localStorage.getItem("wx").match("晴時多雲") || localStorage.getItem("wx").match("多雲時晴")) {
              $("#wx").attr("src", "resource/img/weather-icon/sun+cloudy.png");
            }
            if (localStorage.getItem("wx").match("多雲時晴偶陣雨")) {
              $("#wx").attr("src", "resource/img/weather-icon/sunny+cloudy+shower.png");
            }
        } else {
            $("#wx").attr("src", "resource/img/weather-icon/file-64.gif");
            $("#maxt")[0].innerHTML = "無資料";
            $("#mint")[0].innerHTML = "無資料";
        }
      }
    });
  } else {
      $("#maxt" )[0].innerHTML = localStorage.getItem("max_t" );
      $("#mint" )[0].innerHTML = localStorage.getItem("min_t" );
      $("#wx" ).attr("title", localStorage.getItem("wx"));

      if ( localStorage.getItem("wx" ).match("多雲") || localStorage.getItem("wx" ).match("陰")) {
        $( "#wx" ).attr("src", "resource/img/weather-icon/cloudy.png");
      }
      if ( localStorage.getItem("wx").match("短暫陣雨") || localStorage.getItem("wx").match("短暫雨")) {
        $("#wx").attr("src", "resource/img/weather-icon/heavy-rain.png");
      }
      if (localStorage.getItem("wx").match("雷陣雨")) {
        $("#wx").attr("src", "resource/img/weather-icon/storm+rain.png");
      }
      if (localStorage.getItem("wx").match("有雨")) {
        $("#wx").attr("src", "resource/img/weather-icon/sun+rain-2.png");
      }
      if (localStorage.getItem("wx").match("晴")) {
        $("#wx").attr("src", "resource/img/weather-icon/sunny.png");
      }
      if (localStorage.getItem("wx").match("晴時多雲") || localStorage.getItem("wx").match("多雲時晴")) {
        $("#wx").attr("src", "resource/img/weather-icon/sun+cloudy.png");
      }
      if (localStorage.getItem("wx").match("多雲時晴偶陣雨")) {
        $("#wx").attr("src", "resource/img/weather-icon/sunny+cloudy+shower.png");
      }
  }
}

var get_sentence = function () {
  Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
  };
  update_sentence = new Date(localStorage.getItem("update_sentence"));
  current = new Date()
  if (!localStorage.getItem("sentence") || update_sentence.getDate() !== current.getDate()) {
    $.ajax({
      type: "GET",
      url: "http://api.managers.today:3000/sentence",
      dataType: "json",
      success: function (json) {
        $(json).each(function () {
          localStorage.setItem("sentence", this.content);
          localStorage.setItem("author", this.author_chin_name);
          localStorage.setItem("title", this.author_title);
          localStorage.setItem("english" , this.eng_content);
          localStorage.setItem("sentence_url" , this.url);
          localStorage.setItem("author_url" , this.author_url);
          var tmp_content;
          var rest_content;
          if (this.content.length > 40) {
            tmp_content = this.content.split("，").slice(0, 2).join('，');
            rest_content = this.content.split("，").slice(3).join('，');
            $("#sentence-content h2")[0].innerHTML = tmp_content + "<br>" + rest_content;
          } else {
            $('#sentence-content h2')[0].innerHTML = this.content;
          }
          $('#sentence-content h2')[1].innerHTML = this.eng_content;
          $('#sentence-content h3')[0].innerHTML = "《" + this.author_title + "》" + this.author_chin_name;
          $('#sentence-content a:eq(0)').attr( "href" , "http://192.168.0.62" + this.url );
          $('#sentence-content a:eq(1)').attr( "href" , "http://192.168.0.62" + this.author_url );
        });
        localStorage.setItem("update_sentence", current);
      },
      error: function () {
        console.log("error happened");
        if (localStorage.getItem("sentence")) {
          var tmp = localStorage.getItem("sentence");
          if (tmp.length > 40) {
            tmp_content = tmp.split("，").slice(0, 2).join('，');
            rest_content = tmp.split("，").slice(3).join('，');
            $("#sentence-content h2")[0].innerHTML = tmp_content + "<br>" + rest_content;
          } else {
            $('#sentence-content h2')[0].innerHTML = tmp;
          }
          $('#sentence-content h3')[0].innerHTML = "《" + localStorage.getItem("title") + "》" + localStorage.getItem("author");
        } else {
          console.log("error happened");
        }
      }
    });
  } else {
    var tmp = localStorage.getItem("sentence");
    if (tmp.length > 40) {
      tmp_content = tmp.split("，").slice(0, 2).join('，');
      rest_content = tmp.split("，").slice(3).join('，');
      $("#sentence-content h2")[0].innerHTML = tmp_content + "<br>" + rest_content;
    } else {
      $('#sentence-content h2')[0].innerHTML = tmp;
    }
    $('#sentence-content h3')[0].innerHTML = "《" + localStorage.getItem("title") + "》" + localStorage.getItem("author");
    $('#sentence-content a:eq(0)').attr("href" , "http://192.168.0.62" + localStorage.getItem("sentence_url") );
    $('#sentence-content a:eq(1)').attr( "href" , "http://192.168.0.62" + localStorage.getItem("author_url") );
  }
}


var get_english = function () {
  update = new Date(localStorage.getItem("update_sentence"));
  current_time = new Date();
  if (!localStorage.getItem("vocabulary") || update.getDate() !== current_time.getDate()) {

    $.ajax({
      type: "GET",
      url: "http://api.managers.today:3000/english",
      dataType: "json",
      success: function (json) {
        $(json).each(function () {
          $('.vocabulary-box h3')[0].innerHTML = this.vocabulary;
          $('.vocabulary-box h3')[1].innerHTML = this.chinese_meaning;
          $('.vocabulary-box a').attr( "href" , "http://192.168.0.62" + this.url );
          localStorage.setItem("vocabulary", this.vocabulary);
          localStorage.setItem("chinese_meaning", this.chinese_meaning);
          localStorage.setItem("words_url" , this.url);
        });
      },
      error: function () {
        console.log("error");
      }
    });

  } else {
    $('.vocabulary-box h3')[0].innerHTML = localStorage.getItem("vocabulary");
    $('.vocabulary-box h3')[1].innerHTML = localStorage.getItem("chinese_meaning");
    $('.vocabulary-box a').attr("href" , "http://192.168.0.62" + localStorage.getItem("words_url"));
  }
}

var get_weather_controller = function () {
  // convert millisecond to second
  var tmp = Math.round(new Date(localStorage.getItem("update_time")).getTime() / 1000);
  var current = Math.round(new Date().getTime() / 1000);

  /*change flag for updating weather*/
  if ((current - tmp) > 21600) {
    $.when(localStorage.setItem("update_weather", 0)).then(get_weather);
  } else if (localStorage.getItem("city") !== $('#city').html()) {
    console.log(localStorage.getItem("city"));
    console.log($('#city').html());
    $.when(localStorage.setItem("update_weather", 0)).done(get_weather);
  } else {
    get_weather();
  }
}

var button_group_event = function () {
  $($('.btn-group .three-btn')[0]).click(function () {
    $('#sentence-content').show();
    $('#sentence-content').siblings().hide();
    $('.btn-group .three-btn').map(function () {
      $(this).removeClass("active")
    });
    $($('.btn-group .three-btn')[0]).addClass("active");
  });

  $($('.btn-group .three-btn')[1]).click(function () {
    $('#ABC-contnent').show();
    $('#ABC-contnent').siblings().hide();
    $('.btn-group .three-btn').map(function () {
      $(this).removeClass("active")
    });
    $($('.btn-group .three-btn')[1]).addClass("active");
  });

  $($('.btn-group .three-btn')[2]).click(function () {
    $('#cc-content').show();
    $('#cc-content').siblings().hide();
    $('.btn-group .three-btn').map(function () {
      $(this).removeClass("active")
    });
    $($('.btn-group .three-btn')[2]).addClass("active");
  });
}

var initial_name_and_location = function () {
  var my_name = "";
  var my_location = "";
  $('#initial-text').on( 'keydown' , function(e){
    if (e.which == 13) {
      e.preventDefault();
      my_name = $(this).val();
      $('#location-choose').show();
      $('#initial-name').hide();
    }
  });
  $('.location-choser').click(function(){
    $('.location-panel').show();
    $('#turn-off').css('display' , "inline-block");
  });
  $('#turn-off').click(function(){
    $('.location-panel').hide();
    $('#turn-off').hide();
  });
  $('.location-panel li').click(function(){
    my_location = $(this).html();
    $('#location-choose').hide();
    chrome.storage.local.set(
      {
        "my_name" : my_name,
        "location" : my_location
      },
      function(){
        console.log( "data initialed" );
        localStorage.setItem( "initial_status" , "set" );
        $('#content').show( 0 , initial );
      }
    );
  });

}

var initial = function () {
  if (localStorage.getItem("initial_status") == null) {
    initial_name_and_location();
  } else {
    $('#content').siblings().hide();
    $('#content').show();
    get_city(function () {
      set_current_time();
      set_greeting_word();
      get_name();
      get_sentence();
      get_english();
      setInterval(set_current_time, 10000);
      setInterval(set_greeting_word, 3600000);
      get_weather_controller();
      button_group_event();
    });
  }
}

jQuery.fn.swapWith = function(to) {
    return this.each(function() {
        var copy_to = $(to).clone(true);
        var copy_from = $(this).clone(true);
        $(to).replaceWith(copy_from);
        $(this).replaceWith(copy_to);
    });
};

var tab_animation = function(){
  $('.title-tab').click(function(){
    var left = $(window).width() * 0.2;
    var tmp = $(this).css('left');
    var check;
    for( var i = 0 ; i < 3 ; i++ ){
      if( parseInt($('.title-tab:eq('+ i +')').css('left')) == parseInt($(window).width()*0.2) ){
        check = i;
      }
    }
    $(this).css('left' , $('.title-tab:eq(' +check + ')').css('left'));
    $('.title-tab:eq('+ check + ')').css('left' , tmp );
    $(this).addClass('active');
    $('.title-tab:eq('+ check + ')').removeClass('active');
    active_tab();
    deactive_tab();
  });
}

var active_tab = function(){
  var target = $('.active');
  var id_name = target.attr('id');
  target.attr( 'src' , 'resource/img/others/title-' + id_name + '.png' );
  $( '#' + id_name + '-content' ).fadeIn( 1000 );
  $('#' + id_name + '-content' ).siblings().hide();
}

var deactive_tab = function(){
  var target = $('.title-tab:not(.active)');
  target.map(function(){ $(this).attr( 'src' , 'resource/img/others/title-' + $(this).attr('id') + '-2.png' )});
}

jQuery(function ($) {
  initial();
  tab_animation();
  active_tab();
  deactive_tab();
});
