$(document).ready(function(){
  $(".listCtrl").hide();

	$("#addItemBtn").click(function(){
		var entryTxt = "<li>" + $("input[name=addedItem]").val() + "</li>";
    
    var dueInput = "<input type='text' class='dueInput'>";
    var addTag = "<div class='addTag'>";
    addTag += "<input type='text' class='tagInput'>";
    addTag += "<span class='glyphicon glyphicon-plus addTagBtn'></span>";
    addTag += "</div>";

    var entryDesc = "<div class='entryDesc'>" + dueInput + addTag + "</div>";

    var entryMain = "<div class='entryMain'>" + entryTxt + entryDesc + "</div>";

		var entryCtrl = "<div class='entryCtrl'>";
		entryCtrl += "<span class='glyphicon glyphicon-remove rmvItemBtn'></span>";
		entryCtrl += "<span class='glyphicon glyphicon-time dueBtn'></span>";
    entryCtrl += "<span class='glyphicon glyphicon-tags showAddTag'></span>";
		entryCtrl += "</div>"
		
		var listEntry = "<div class='listEntry'>" + entryMain + entryCtrl + "</div>";

    $("#toDoList").append(listEntry);
    $("input[name=addedItem]").val("");

    $(".dueInput").hide();
    $(".addTag").hide();

    $(".listCtrl").show();
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
      $(this).parent().parent().find(".entryDesc").prepend("<div class='tag dueTag'>" + input + "</div>");
      $(this).parent().parent().parent().addClass("due");
      },
      dateFormat: "MM dd, yy"
    });
    
    if($(this).parent().parent().hasClass("due")){
      $(this).parent().parent().removeClass("due");
      $(this).parent().parent().find(".dueTag").remove();
    }
    else{
      $(this).parent().parent().find(".dueInput").show().focus().hide();
    }
  });

  $(document).on("click", ".showAddTag", function(){
    $(this).parent().parent().find(".addTag").show();
  });

  $(document).on("click", ".addTagBtn", function(){
    var tag = $(this).parent().find(".tagInput").val();
    $(this).parent().parent().append("<div class='tag'>" + tag + "</div>");
    $(this).parent().parent().parent().parent().addClass(tag.toLowerCase());
    $(this).parent().find(".tagInput").val("");
    $(this).parent().hide();
  });

  $(document).on("click", ".tag", function(){
    if($(this).parent().parent().parent().hasClass("due")){
      $(this).parent().parent().parent().removeClass("due");
    }
    $(this).remove();
  });  

  $("#filterBtn").click(function(){
    var filter = $("input[name=filterInput]").val().toLowerCase();
    $(".listEntry").not("." + filter).hide();
    $("input[name=filterInput]").val("");
  });

  $("#removeFilter").click(function(){
    $(".listEntry").show();
  });
});