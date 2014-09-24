var get_weather = function(){
  $.ajax({
      type: "GET",
      url: "http://api.bnext.com.tw:3000/weather",
      dataType: "json",
      success: function(json){
        $(json).each(function(){
          if( this.name === $('#city').html()){
            console.log(this.name);
            console.log(this.wx);
            console.log(this.maxt);
            console.log(this.mint);
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
