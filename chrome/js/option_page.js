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
  var now_setting = 0;
  $('#myonoffswitch').click(function(){
    if(now_setting == 0){
      now_setting = "1";
      chrome.storage.local.set(
        {"time_format" : now_setting },
        function(){
          console.log("time format set to 24");
        }
      );
    }else{
      now_setting = "0";
      chrome.storage.local.set(
        {"time_format" : now_setting },
        function(){
          console.log("time format set to 12");
        }
      );
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
