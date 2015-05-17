$(document).ready(function(){
  $(".listCtrl").hide();

	$("#addItemBtn").click(function(){
		var entryTxt = "<li>" + $("input[name=addedItem]").val() + "</li>";
    
    var dueInput_disp = "<input type='text' class='dueInput_disp'>";
    var dueInput_sort = "<input type='text' class='dueInput_sort'>";
    var addTag = "<div class='addTag'>";
    addTag += "<input type='text' class='tagInput'>";
    addTag += "<span class='glyphicon glyphicon-plus addTagBtn'></span>";
    addTag += "</div>";

    var entryDesc = "<div class='entryDesc'>" + dueInput_disp + dueInput_sort + addTag + "</div>";

    var entryMain = "<div class='entryMain'>" + entryTxt + entryDesc + "</div>";

		var entryCtrl = "<div class='entryCtrl'>";
		entryCtrl += "<span class='glyphicon glyphicon-remove rmvItemBtn'></span>";
		entryCtrl += "<span class='glyphicon glyphicon-time dueBtn'></span>";
    entryCtrl += "<span class='glyphicon glyphicon-tags showAddTag'></span>";
		entryCtrl += "</div>"
		
		var listEntry = "<div class='listEntry'>" + entryMain + entryCtrl + "</div>";

    $("#toDoList").append(listEntry);
    $("input[name=addedItem]").val("");

    $(".dueInput_disp").hide();
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
    $(this).parent().parent().find(".dueInput_disp").datepicker({
      onSelect: function(input, inst){
      $(this).parent().parent().find(".entryDesc").prepend("<div class='tag dueTag'>" + input + "</div>");
      $(this).parent().parent().parent().addClass("due");
      },
      dateFormat: "MM dd, yy",
      altField: $(this).parent().parent().find(".dueInput_sort"),
      altFormat: "yymmdd"
    });
    
    if($(this).parent().parent().hasClass("due")){
      $(this).parent().parent().removeClass("due");
      $(this).parent().parent().find(".dueTag").remove();
    }
    else{
      $(this).parent().parent().find(".dueInput_disp").show().focus().hide();
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

  $("#sortBtn").click(function(){
    var listEntries = $(".listEntry");
    listEntries.sort(function(entry1, entry2){
      var txt1 = $(entry1).find("li").text();
      var txt2 = $(entry2).find("li").text();
      if(!$(entry1).hasClass("due") && !$(entry2).hasClass("due")){
        if(txt1 > txt2){
          return 1;
        } else if(txt2 > txt1){
          return -1;
        } else{
          return 0;
        }
      }
      else if(!$(entry1).hasClass("due")){
        return 1;
      }
      else if(!$(entry2).hasClass("due")){
        return -1;
      }

      var date1 = Number($(entry1).find(".dueInput_sort").val());
      var date2 = Number($(entry2).find(".dueInput_sort").val());
      if(date1 > date2){
        return 1;
      } else if(date2 > date1){
        return -1;
      } else{
        if(txt1 > txt2){
          return 1;
        } else if(txt2 > txt1){
          return -1;
        } else{
          return 0;
        }
      }
    });
    listEntries.detach().appendTo("#toDoList");
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