$(document).ready(function(){
  $("#addItemBtn").click(function(){
    $("#toDoList").append("<li>" + $("input[name=addedItem]").val() + "</li>");
  });
 $(document).on("click", "#toDoList li", function(){
  	$(this).css("text-decoration", "line-through");
  });
  /*$(document).on("click", "", function(){

  });*/
});