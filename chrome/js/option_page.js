var save_change = function(){
  var my_name = $('#name')[0].value;
  chrome.storage.sync.set({


  });
}

var set_dropdown = function(){
  $('.dropdown-menu li a').click(function(){
    var where = $(this).text();
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
