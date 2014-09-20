var get_weather(){
  $.ajax({
      type: "GET",
      url: "http://opendata.cwb.gov.tw/opendata/MFC/F-C0032-001.xml",
      dataType: "xml",
      success: function(xml){
        $(xml).find("location").each(function(){


        });
      },
      error: function(){
       alert("error");
      }
  });

}


jQuery(function($){


});
