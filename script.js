$(document).ready(function(){
  

	$("#addItemBtn").click(function(){
		var entryText = "<li>" + $("input[name=addedItem]").val(); + "</li>";
    var entryDesc = "<div class='entryDesc'><input type='text' class='dueInput'></div>";
    var entryMain = "<div class='entryMain'>" + entryText + entryDesc + "</div>";

		var entryControl = "<div class='entryControl'>";
		entryControl += "<span class='glyphicon glyphicon-remove rmvItemBtn'></span>";
		entryControl += "<span class='glyphicon glyphicon-time dueBtn'></span>";
		entryControl += "</div>"
		
		var listEntry = "<div>" + entryMain + entryControl + "</div>";

    $("#toDoList").append(listEntry);
    $("input[name=addedItem]").val("");

    $(".dueInput").hide();
  });



 	$(document).on("click", ".entryMain li", function(){
    if($(this).css("text-decoration") === "none"){
      $(this).css("text-decoration", "line-through");
    }
    else{
      $(this).css("text-decoration", "none");
    }
  });

  $(document).on("click", ".rmvItemBtn", function(){
  	$(this).parent().parent().remove();
  });

  

  $(document).on("click", ".dueBtn", function(){

    $(this).parent().parent().find(".dueInput").datepicker({
      onSelect: function(input, inst){
      $(this).parent().parent().find(".entryDesc").append("<div class='dueTag'>" + input + "</div>");
      },
      dateFormat: "MM dd, yy"
    });
    
    if($(this).parent().parent().hasClass("due")){
      $(this).parent().parent().removeClass("due");
      $(this).parent().parent().find(".dueTag").remove();
    }
    else{
      $(this).parent().parent().addClass("due");
      $(this).parent().parent().find(".dueInput").show().focus().hide();
    }
  });
});