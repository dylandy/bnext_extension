var get_weather = function(){
  $.ajax({
      type: "GET",
      url: "http://api.bnext.com.tw:3000/weather",
      dataType: "json",
      success: function(json){
          var i = 0;
          $(json).each(function(){
            if( this.name === $('#city').html()){
              $("#wx"+ i)[0].innerHTML = this.wx;
              $("#maxt"+ i )[0].innerHTML = this.maxt;
              $("#mint"+ i)[0].innerHTML = this.mint;
              i++;
            }
          });
      },
      error: function(){
       alert("error");
      }
  });
}


jQuery(function($){
  get_weather();
});
