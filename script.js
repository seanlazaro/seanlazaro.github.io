$(document).ready(function(){
  $("#addItemBtn").click(function(){
    $("#mainBlock").append($("input[name=addedItem]").val());
  });
});