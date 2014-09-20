var get_weather = function(){
  $.ajax({
      type: "GET",
      url: "http://api.bnext.com.tw/weather",
      dataType: "json",
      success: function(json){
        $(json).find("location").each(function(){
        });
      },
      error: function(){
       alert("error");
      }
  });
}


jQuery(function($){});
