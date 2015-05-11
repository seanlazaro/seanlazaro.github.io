$(document).ready(function(){
  $("#addItemBtn").click(function(){
    $("#toDoList").append('<li>' + $("input[name=addedItem]").val() + '</li>');
  });
});