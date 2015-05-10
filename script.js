$(document).ready(function(){
  $("#addItem").click(function(){
    $("body").append($("input[name=userInput]").val());
  });
});