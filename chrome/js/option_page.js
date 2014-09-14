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

jQuery(function($){
  set_dropdown();
  $('#summit').click(function(){
    save_change();
    $(this)[0].innerHTML = "已儲存";
    $(this).addClass("disabled");
  });
});
