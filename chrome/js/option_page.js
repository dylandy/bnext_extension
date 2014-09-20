var save_change = function(){
  var my_name = $('#name')[0].value;

  chrome.storage.local.set(
    {"my_name" : my_name },
    function(){
      console.log("data saved");
    }
  );
}

var set_dropdown = function(){
  $('.dropdown-menu li a').click(function(){
    var where = $(this).text();

    chrome.storage.local.set(
      {"location" : where},
      function(){
        console.log("location saved");
      }
    );
  });
}

var set_time_format = function(){
  now_format="";
  chrome.storage.local.get("time_format" , function(result){
    now_format = result.time_format;
    if(now_format){
      if(now_format == 0){
        $('.onoffswitch-inner').attr('data-before' , "12");
        $('.onoffswitch-inner').attr('data-after' , "24");
        $('#myonoffswitch').click(function(){
          if(now_format == 0){
            now_format = "1";
              chrome.storage.local.set(
                {"time_format" : now_format },
                function(){
                  console.log("time format set to 24");
                }
              );
          }else{
            now_format = "0";
            chrome.storage.local.set(
              {"time_format" : now_format },
              function(){
                console.log("time format set to 12");
              }
            );

          }
        });
        }else{
            $('.onoffswitch-inner').attr('data-before' , "24");
            $('.onoffswitch-inner').attr('data-after' , "12");
            $('#myonoffswitch').click(function(){
            if(now_format == 1){
              now_format = "0";
              chrome.storage.local.set(
                {"time_format" : now_format },
                function(){
                  console.log("time format set to 12");
                }
              );
            }else{
              now_format = "1";
              chrome.storage.local.set(
                {"time_format" : now_format },
                function(){
                  console.log("time format set to 24");
                }
              );
            }
          });
      }
    }else{
      $('.onoffswitch-inner').attr('data-before' , "24");
      $('.onoffswitch-inner').attr('data-after' , "12");
      var now_setting = 1;
      $('#myonoffswitch').click(function(){
          if(now_setting == 1){
            now_setting = 0;
            chrome.storage.local.set(
              {"time_format" : now_setting },
              function(){
                console.log("time format set to 12");
              }
            );
          }else{
            now_setting = 1;
            chrome.storage.local.set(
              {"time_format" : now_setting },
              function(){
                console.log("time format set to 24");
              }
            );
          }
      });
    }
  });



}

jQuery(function($){
  set_dropdown();
  set_time_format();
  $('#summit').click(function(){
    save_change();
    $(this)[0].innerHTML = "已儲存";
    $(this).addClass("disabled");
  });
});
