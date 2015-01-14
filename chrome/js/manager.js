var time_format = "";

var set_current_time = function () {
  var current = new Date;
  var year = current.getFullYear();
  var month = current.getMonth() + 1;
  var day = current.getDate();
  var hour = current.getHours();
  var minute = current.getMinutes();


  //get 12/24 format

  chrome.storage.local.get("time_format", function (result) {
    time_format = result.time_format;

    //show time in correct format
    if (time_format == 0) {
      if (hour < 12) {
        if (minute < 10) {
          var time_result = "0" + hour.toString() + ":" + "0" + minute.toString() + "am";
        } else if (hour < 10) {
          var time_result = "0" + hour.toString() + ":" + minute.toString() + "am";
        } else if (hour >= 10) {
          var time_result = hour.toString() + ":" + minute.toString() + "am";
        }
      } else {
        if ((hour - 12) > 10 && minute < 10) {
          var time_result = (hour - 12).toString() + ":" + "0" + minute.toString() + "pm";
        } else if ((hour - 12) < 10 && minute < 10) {
          var time_result = "0" + (hour - 12).toString() + ":" + "0" + minute.toString() + "pm";
        } else if ((hour - 12) < 10 && minute >= 10) {
          var time_result = "0" + (hour - 12).toString() + ":" + minute.toString() + "pm";
        } else if ((hour - 12) >= 10 && minute >= 10) {
          var time_result = (hour - 12).toString() + ":" + minute.toString() + "pm";
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


  $('#current_date')[0].innerHTML = year + "/" + month + "/" + day;
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
  if (localStorage.getItem("update_weather") == 0) {
    $.ajax({
      type: "GET",
      url: "http://api.managers.today/weather",
      dataType: "json",
      success: function (json) {
        var counting = 0;
        $(json).each(function () {
          if (this.name === $('#city').html() && counting < 1) {
            localStorage.setItem("max_t", this.maxt);
            localStorage.setItem("min_t", this.mint);
            localStorage.setItem("wx", this.wx);
            localStorage.setItem("city", this.name);
            //            console.log(this.maxt);
            //            console.log(this.mint);
            //            console.log(this.wx);
            //            console.log(this.name);

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
              $("#wx").attr("src", "resource/img/weather-icon/sunny+cloudy.png");
            }
            if (this.wx.match("多雲時晴偶陣雨")) {
              $("#wx").attr("src", "resource/img/weather-icon/sunny+cloudy+shower.png");
            }
            counting++;
          }
          localStorage.setItem("update_weather", 1);
          localStorage.setItem("update_time", new Date());
        });

      },
      error: function () {
        if (localStorage.getItem("max_t")) {
          $("#maxt")[0].innerHTML = localStorage.getItem("max_t");
          $("#mint")[0].innerHTML = localStorage.getItem("min_t");
          $("#wx").attr("title", localStorage.getItem("wx"));

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
            $("#wx").attr("src", "resource/img/weather-icon/sunny+cloudy.png");
          }
          if (localStorage.getItem("wx").match("多雲時晴偶陣雨")) {
            $("#wx").attr("src", "resource/img/weather-icon/sunny+cloudy+shower.png");
          }
        } else {
          $("#wx").attr("src", "resource/img/weather/file-64.gif");
          $("#maxt")[0].innerHTML = "無";
          $("#mint")[0].innerHTML = "無";
        }
      }
    });
  } else {
    $("#maxt")[0].innerHTML = localStorage.getItem("max_t");
    $("#mint")[0].innerHTML = localStorage.getItem("min_t");
    $("#wx").attr("title", localStorage.getItem("wx"));

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
      $("#wx").attr("src", "resource/img/weather-icon/sunny+cloudy.png");
    }
    if (localStorage.getItem("wx").match("多雲時晴偶陣雨")) {
      $("#wx").attr("src", "resource/img/weather-icon/sunny+cloudy+shower.png");
    }
  }
}

var get_sentence = function () {
  update_sentence = new Date(localStorage.update_sentence);
  current = new Date()
  if (update_sentence.getDate() !== current.getDate()) {
    $.ajax({
      type: "GET",
      url: "http://api.managers.today/sentence",
      dataType: "json",
      success: function (json) {
        $(json).each(function () {
          localStorage.setItem("sentence", this.content);
          localStorage.setItem("author", this.author_chin_name);
          localStorage.setItem("author_eng", this.author_eng_name);
          localStorage.setItem("title", this.author_title);
          localStorage.setItem("sentence_url", this.url);
          localStorage.setItem("author_url", this.author_url);

          $('#sentence-content h2')[0].innerHTML = this.content;
          if(this.author_eng_name){
            $('#sentence-content h3')[0].innerHTML = this.author_chin_name + "（" + this.author_eng_name + "）" +
            "<br>" + this.author_title;
          }else{
            $('#sentence-content h3')[0].innerHTML = this.author_chin_name +"<br>" + this.author_title;
          }
          $('#sentence-content a:eq(0)').attr("href", "http://www.managertoday.com.tw" + this.url);
          $('#sentence-content a:eq(1)').attr("href", "http://www.managertoday.com.tw" + this.author_url);
        });
        localStorage.setItem("update_sentence", current);
      },
      error: function () {
        console.log("error happened");
        if (localStorage.getItem("sentence")) {
          var tmp = localStorage.getItem("sentence");
          $('#sentence-content h2')[0].innerHTML = tmp;
          if( localStorage.author_eng ){
            $('#sentence-content h3')[0].innerHTML = localStorage.author + "（" + localStorage.author_eng + "）" +
            "<br>" + localStorage.title;
          }else{
            $('#sentence-content h3')[0].innerHTML = localStorage.author + "<br>" + localStorage.title;
          }
          $('#sentence-content a:eq(0)').attr("href", "http://www.managertoday.com.tw" + localStorage.getItem("sentence_url"));
          $('#sentence-content a:eq(1)').attr("href", "http://www.managertoday.com.tw" + localStorage.getItem("author_url"));
        } else {
          console.log("error happened");
        }
      }
    });
  } else {
    var tmp = localStorage.getItem("sentence");
    $('#sentence-content h2')[0].innerHTML = tmp;

    if( localStorage.author_eng ){
            $('#sentence-content h3')[0].innerHTML = localStorage.author + "（" + localStorage.author_eng + "）" +
            "<br>" + localStorage.title;
    }else{
      $('#sentence-content h3')[0].innerHTML = localStorage.author + "<br>" + localStorage.title;
    }
    $('#sentence-content a:eq(0)').attr("href", "http://www.managertoday.com.tw" + localStorage.getItem("sentence_url"));
    $('#sentence-content a:eq(1)').attr("href", "http://www.managertoday.com.tw" + localStorage.getItem("author_url"));
  }
}


var get_english = function () {
  current_time = new Date();
  if (current_time.getDay() < 5 && current_time.getDay() > 0) {
    $.ajax({
      type: "GET",
      url: "http://api.managers.today/english",
      dataType: "json",
      success: function (json) {
        $(json).each(function () {
          $('.vocabulary-box h3')[0].innerHTML = this.vocabulary;
          $('.vocabulary-box h3')[1].innerHTML = this.chinese_meaning;
          $('.vocabulary-box a').attr("href", "http://www.managertoday.com.tw" + this.url);
          localStorage.setItem("vocabulary", this.vocabulary);
          localStorage.setItem("chinese_meaning", this.chinese_meaning);
          localStorage.setItem("words_url", this.url);
        });
      },
      error: function () {
        $('.vocabulary-box h3')[0].innerHTML = localStorage.getItem("vocabulary");
        $('.vocabulary-box h3')[1].innerHTML = localStorage.getItem("chinese_meaning");
        $('.vocabulary-box a').attr("href", "http://www.managertoday.com.tw" + localStorage.getItem("words_url"));
      }
    });
  } else if ( current_time.getDay() >= 5 || current_time.getDay() == 0 ) {
    $.ajax({
      type: "GET",
      url: "http://api.managers.today/condition",
      dataType: "json",
      success: function (json) {
        var i = 0;
        $(json).each(function () {
          localStorage.setItem("english_article" + i, this.title);
          localStorage.setItem("english_article_url" + i, this.url);
          i++;
        });
        var test = parseInt(Math.random() * 3);
        $('.vocabulary-box h3')[0].innerHTML = localStorage.getItem("english_article" + test);
        $('.vocabulary-box a').attr("href", "http://www.managertoday.com.tw/" +
          localStorage.getItem("english_article_url" + test));
      },
      error: function () {
        var test = parseInt(Math.random() * 3);
        $('.vocabulary-box h3')[0].innerHTML = localStorage.getItem("english_article" + test);
        $('.vocabulary-box a').attr("href", "http://www.managertoday.com.tw/" +
          localStorage.getItem("english_article_url" + test));
      }
    });
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
    //    console.log(localStorage.getItem("city"));
    //    console.log($('#city').html());
    $.when(localStorage.setItem("update_weather", 0)).done(get_weather);
  } else {
    get_weather();
  }
}

var initial_name_and_location = function () {
  var my_name = "";
  var my_location = "";
  $('#initial-text').on('keydown', function (e) {
    if (e.which == 13) {
      e.preventDefault();
      my_name = $(this).val();
      $('#location-choose').show();
      $('#initial-name').hide();
    }
  });
  $('.location-choser').click(function () {
    $('.location-panel').show();
    $('#turn-off').css('display', "inline-block");
  });
  $('#turn-off').click(function () {
    $('.location-panel').hide();
    $('#turn-off').hide();
  });
  $('.location-panel li').click(function () {
    my_location = $(this).html();
    $('#location-choose').hide();
    chrome.storage.local.set({
        "my_name": my_name,
        "location": my_location
      },
      function () {
        console.log("data initialed");
        localStorage.setItem("initial_status", "set");
        $('#content').show(0, initial);
      }
    );
  });

}

var tab_animation = function () {
  $('.title-tab').click(function () {
    var left = $(window).width() * 0.2;
    var tmp = $(this).css('left');
    var check;
    for (var i = 0; i < 3; i++) {
      if (parseInt($('.title-tab:eq(' + i + ')').css('left')) == parseInt($(window).width() * 0.2)) {
        check = i;
      }
    }

    if($(this).attr("src") !== $('.title-tab:eq('+ check + ')').attr("src")){
      $(this).css('left', $('.title-tab:eq(' + check + ')').css('left'));
      $('.title-tab:eq(' + check + ')').css('left', tmp);
      $(this).addClass('active');
      $('.title-tab:eq(' + check + ')').removeClass('active');
    }
  });
}

var tab_checked = function(){
  $('label').click(function(){
    $('input').prop("checked" , false);
  });
}

var checked_pic = function(){
  var id_name = $('input:checked ~ label').attr("id").split('-')[0];
  $('input:checked ~ label').css('background-image' ,
                                             "url(chrome-extension://hbindcgocgdjhphjeoknjkcjiodfjkac/resource/img/others/title-"+id_name+".png)");
  $('input:not(:checked) ~ label').map(function(){
    var id = $(this).attr("id").split('-')[0];
    $(this).css("background-image", "url(chrome-extension://hbindcgocgdjhphjeoknjkcjiodfjkac/resource/img/others/title-"+id+"-2.png)");
  });


}

var get_divination_essay = function () {
  $.ajax({
    type: "GET",
    url: "http://api.managers.today/article",
    dataType: "json",
    success: function (json) {
      var i = 0;
      $(json).each(function () {
        localStorage.setItem("article_title" + i, this.title);
        localStorage.setItem("article_url" + i, this.url);
        i++;
      });
    },
    error: function () {
      console.log("error");
    }
  });

}

var get_divination_result = function () {
  var last_update = new Date(localStorage.update_time);
  var current = new Date();
  if (current.getDate() !== last_update.getDate()) {
    get_divination_essay();
  }

  $('#before-shake img').click(function (e) {
    e.preventDefault();
    $(this).parent().hide();
    $('#shake-result').show(0, function () {
      var test = parseInt(Math.random() * 10);
      var random_article = parseInt(localStorage.counter) - 1;
      if (test < 2) {
        $('#divination-status')[0].innerHTML = "大吉";
        $('#divination-sentence')[0].innerHTML = "恭喜你！多吸收知識，明天會更好";
        $('#divination-title')[0].innerHTML = localStorage.getItem("article_title" + random_article);
        $('#divi-sentences a').attr("href", "http://www.managertoday.com.tw" + localStorage.getItem("article_url" + random_article));
      }
      if (test >= 2 && test < 6) {
        $('#divination-status')[0].innerHTML = "吉";
        $('#divination-sentence')[0].innerHTML = "工作順利！若做到以下這點，運勢會更好";
        $('#divination-title')[0].innerHTML = localStorage.getItem("article_title" + random_article);
        $('#divi-sentences a').attr("href", "http://www.managertoday.com.tw" + localStorage.getItem("article_url" + random_article));
      }
      if (test >= 6 && test < 9) {
        $('#divination-status')[0].innerHTML = "中平";
        $('#divination-sentence')[0].innerHTML = "今天的工作幸運，就在以下提示中";
        $('#divination-title')[0].innerHTML = localStorage.getItem("article_title" + random_article);
        $('#divi-sentences a').attr("href", "http://www.managertoday.com.tw" + localStorage.getItem("article_url" + random_article));
      }
      if (test == 9) {
        $('#divination-status')[0].innerHTML = "凶";
        $('#divination-sentence')[0].innerHTML = "小心！魔鬼就在細節裡！";
        $('#divination-title')[0].innerHTML = localStorage.getItem("article_title" + random_article);
        $('#divi-sentences a').attr("href", "http://www.managertoday.com.tw" + localStorage.getItem("article_url" + random_article));
      }
    });
  });
}

var set_default_content = function () {
  $("input").first().prop("checked" , true);
  localStorage.setItem("sentence", "通往成功的電梯故障了，你就只好爬樓梯，一次一步慢慢爬。");
  localStorage.setItem("author", "喬．吉拉德");
  localStorage.setItem("author_eng", "Joe Girard");
  localStorage.setItem("title", "美國著名業務員");
  localStorage.setItem("sentence_url", "/quotes/view/830");
  localStorage.setItem("author_url", "/quotes/celebrity/239");
  localStorage.setItem("vocabulary", "workaholic");
  localStorage.setItem("chinese_meaning", "工作狂");
  localStorage.setItem("words_url", "/dictionary/word/26");
  localStorage.setItem("counter", 1);
  return 1;
}

var initial = function () {
  if (localStorage.getItem("initial_status") == null) {
    var flag = 0;
    flag = set_default_content();

    while (flag == 1) {
      initial_name_and_location();
      flag = 0;
    }
  } else {
    $('#content').siblings().hide();
    $('#content').show();
    $("input").first().prop("checked" , true);
    get_city(function () {
      set_current_time();
      set_greeting_word();
      get_name();
      get_english();
      get_sentence();
      setInterval(set_current_time, 10000);
      setInterval(set_greeting_word, 3600000);
      get_weather_controller();
      get_divination_result();

    });
    var current = new Date();
    if( new Date(localStorage.update_divi).getDate() != current.getDate() ){
      localStorage.setItem("counter" , 1);
    }
  }
}

var mix_sharing_link = function(){
  $('#sentence-share-fb').click(function(){
    window.open("https://www.facebook.com/sharer/sharer.php?u=http://www.managertoday.com.tw"+localStorage.sentence_url+"&display=popup&ref=plugin",'manager', config='height=500,width=500')
  });
}

jQuery(function ($) {
  initial();
  checked_pic();
  $("label").click(function(){
    $("input").prop("checked" , "false");
    $(this).prev().prop("checked", "true");
    checked_pic();
  });
  mix_sharing_link();
  get_divination_result();
  $('.title-tab:eq(2)').click(function(){
    if(localStorage.counter < 3){
      if( $('.title-tab:eq(2)').hasClass("active") && $('#shake-result').css("display") === "block"){
        localStorage.setItem("counter" , parseInt(localStorage.counter) + 1 );
      }
      $('#shake-result').hide();
      $('#before-shake').show();
    }else{
      $('#shake-result').hide();
      $('#before-shake').hide();
      $('#cant-shake').show();
    }
  });
  $('#again').click(function (e) {
    e.preventDefault();
    $(this).parent().hide();
    if (localStorage.counter < 3) {
      $('#before-shake').show( 0 , function(){localStorage.setItem("counter", parseInt(localStorage.counter) + 1);});
    }else{
      $('#before-shake').hide();
      $('#cant-shake').show();
      localStorage.setItem("update_divi" , new Date());
    }
  });
  $('.title-tab:eq(1)').click(function(){
      get_english();  
  });
  tab_animation();
});
