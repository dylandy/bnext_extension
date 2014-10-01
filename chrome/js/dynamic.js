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
                $("#wx" + i ).attr("src" , "resource/img/weather/cloud-lighting-64.gif");
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
              i++;
            }
          });
      },
      error: function(){
        for( var i = 0 ; i < 3 ; i++ ){
          $("#wx"+i).attr( "src" , "resource/img/weather/file-64.gif");
          $("#maxt"+i)[0].innerHTML = "無資料";
          $("#mint"+i)[0].innerHTML = "無資料";
        }
      }
  });
}


jQuery(function($){
  get_weather();
});
