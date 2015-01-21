localStorage.sentence_counter ? sentence_counter = localStorage.sentence_counter : sentence_counter = 0;
localStorage.ABC_counter ? ABC_counter = localStorage.ABC_counter : ABC_counter = 0;
localStorage.cc_counter ? cc_counter = localStorage.cc_counter : cc_counter = 0;
localStorage.last_to_server? last_to_server = localStorage.last_to_server : last_to_server = new Date();

var post_to_server = function(){
  var data = {};
  data["sentence_counter"] = localStorage.sentence_counter;
  data["ABC_counter"] = localStorage.ABC_counter;
  data["cc_counter"] = localStorage.cc_counter;
  console.log(JSON.stringify(data));
  $.ajax({
    type: "POST",
    url: "http://api.managers.today/statistic",
    data: JSON.stringify(data),
    dataType: "json",
    success: function(){console.log("done")},
  });
}

var daily_inital = function(){
  var current = new Date();
  if(current.getDate() !== localStorage.last_to_server){
    post_to_server();
    localStorage.setItem("last_to_server" , current);
  }
}

jQuery(function($){
  $('label:eq(0)').click(function(){
    localStorage.setItem("sentence_counter", sentence_counter+=1);
//    console.log("sentence_counter = "+sentence_counter);
  });
  $('label:eq(1)').click(function(){
    localStorage.setItem("ABC_counter" , ABC_counter+=1);
//    console.log("ABC_counter = "+ABC_counter);
  });
  $('label:eq(2)').click(function(){
    localStorage.setItem("cc_counter" , cc_counter+=1);
//    console.log("cc_counter = "+cc_counter);
  });
});
