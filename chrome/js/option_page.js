var my_name = "";
var where = "";
var now_format = "";

var save_location = function () {
  chrome.storage.local.get("location" , function(result){
    $('#ask-location button')[0].innerHTML = result.location + "<i class='fa fa-sort-desc'></i>";
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
    where = $(this).html();
    $('.location-panel').hide();
    $('#turn-off').hide();
    $('#ask-location button')[0].innerHTML = where + "<i class='fa fa-sort-desc'></i>";
  });
}
var save_change = function () {
  chrome.storage.local.set({
      "my_name": my_name,
      "location": where
    },
    function () {
      console.log("data saved");
      console.log("location saved");
    }
  );
}

var set_time_format = function (){
  chrome.storage.local.get("time_format", function (result) {
    now_format = result.time_format;
    if (now_format) {
      if (now_format == 0) {
        $('.onoffswitch-inner').attr('data-before', "12");
        $('.onoffswitch-inner').attr('data-after', "24");
        $('#myonoffswitch').click(function () {
          if (now_format == 0) {
            now_format = "1";
            chrome.storage.local.set({
                "time_format": now_format
              },
              function () {
                console.log("time format set to 24");
              }
            );
          } else {
            now_format = "0";
            chrome.storage.local.set({
                "time_format": now_format
              },
              function () {
                console.log("time format set to 12");
              }
            );

          }
        });
      } else {
        $('.onoffswitch-inner').attr('data-before', "24");
        $('.onoffswitch-inner').attr('data-after', "12");
        $('#myonoffswitch').click(function () {
          if (now_format == 1) {
            now_format = "0";
            chrome.storage.local.set({
                "time_format": now_format
              },
              function () {
                console.log("time format set to 12");
              }
            );
          } else {
            now_format = "1";
            chrome.storage.local.set({
                "time_format": now_format
              },
              function () {
                console.log("time format set to 24");
              }
            );
          }
        });
      }
    } else {
      $('.onoffswitch-inner').attr('data-before', "24");
      $('.onoffswitch-inner').attr('data-after', "12");
      var now_setting = 1;
      $('#myonoffswitch').click(function () {
        if (now_setting == 1) {
          now_setting = 0;
          chrome.storage.local.set({
              "time_format": now_setting
            },
            function () {
              console.log("time format set to 12");
            }
          );
        } else {
          now_setting = 1;
          chrome.storage.local.set({
              "time_format": now_setting
            },
            function () {
              console.log("time format set to 24");
            }
          );
        }
      });
    }
  });
}


jQuery(function ($) {
  chrome.storage.local.get("my_name", function (result) {
    $('input')[0].value = result.my_name;
    set_time_format();
    save_location();
    $('#summit').click(function () {
      my_name = $('#name').val();
      $(this)[0].innerHTML = "已儲存";
      save_change();
    });
  });
});
