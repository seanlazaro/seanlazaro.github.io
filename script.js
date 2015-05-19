if(localStorage.getItem("numListEntries") === null){
    localStorage.setItem("numListEntries", 0);
}
var numListEntries = Number(localStorage.getItem("numListEntries"));

$(document).ready(function(){
/* Startup Processes -------------------------------------------------------- */

  if(localStorage.getItem("listName") !== null){
    $("#mainCol h2").text(localStorage.getItem("listName"));
  }
  $("input[name=listName]").hide();
  loadList();
  $("#listCtrl").hide();

/* Events and Handlers ------------------------------------------------------ */

  $("#mainCol h2").click(function(){
    $("input[name=listName]").show();
    $("input[name=listName]").select();
  });

  $("input[name=listName]").keypress(function(key){
    if(key.which === 13){
      $("#mainCol h2").text($(this).val());
      localStorage.setItem("listName", $(this).val());
      $(this).hide();
    }
  });

  $("input[name=listName]").focusout(function(){
    if($(this).val() !== ""){
      $("#mainCol h2").text($(this).val());
      localStorage.setItem("listName", $(this).val());  
    }
    $(this).hide();
  });

  $("#mainForm").submit(function(event){
    event.preventDefault();
  });

  $("input[name=entryTxt]").keypress(function(key){
    if(key.which === 13){
      $("#addEntryBtn").trigger("click");
    }
  });

	$("#addEntryBtn").click(function(){
    addEntry($("input[name=entryTxt]").val());
    numListEntries++;
    localStorage.setItem("numListEntries", numListEntries);
    saveList();
  });

 	$(document).on("click", ".entryMain li", function(){
    if($(this).css("text-decoration") === "none"){
      $(this).css("text-decoration", "line-through");
    }
    else{
      $(this).css("text-decoration", "none");
    }
  });

  $(document).on("click", ".tag", function(){
    if($(this).hasClass("dueTag")){
      $(this).parent().parent().parent().removeClass("due");
    } else{
      var tagClass = $(this).text();
      $(this).parent().parent().parent().removeClass(tagClass);
    }
    $(this).remove();
    saveList();
  });

  $(document).on("keypress", "input[name=tagInput]", function(key){
    if(key.which === 13){
      $(this).parent().parent().parent().parent().find(".addTagBtn").trigger("click");
    }
  });

  $(document).on("click", function(event){
    if(!$(event.target).closest(".addTag").length && !$(event.target).hasClass("showAddTag")){
      $(".addTag").hide();
    }
    else if($(event.target).hasClass("showAddTag")){
      $(".addTag").not($(event.target).parent().parent().find(".addTag")).hide();
    }
  });

  $(document).on("click", ".addTagBtn", function(){
    var tag = $(this).parent().find("input[name=tagInput]").val();
    if(tag === ""){
      tag = "Important";
    }
    addTag(tag, $(this).parent().parent().parent().parent());
    saveList();
  });

  $(document).on("click", ".dueBtn", function(){
    $(this).parent().parent().find("input[name=dueInput_disp]").datepicker({
      onSelect: function(input, inst){
        $(this).parent().parent().find(".entryDesc").prepend("<div class='tag dueTag'>" + input + "</div>");
        $(this).parent().parent().parent().addClass("due");
        if($("#toDoList").hasClass("tags-hidden")){
          $(".tag").hide();
        }
        saveList();
      },
      dateFormat: "MM dd, yy",
      altField: $(this).parent().parent().find("input[name=dueInput_sort]"),
      altFormat: "yymmdd"
    });
    
    if($(this).parent().parent().hasClass("due")){
      $(this).parent().parent().removeClass("due");
      $(this).parent().parent().find(".dueTag").remove();
      saveList();
    }
    else{
      $(this).parent().parent().find("input[name=dueInput_disp]").show().focus().hide();
    }
  });

  $(document).on("click", ".showAddTag", function(){
    $(this).parent().parent().find(".addTag").show();
    $(this).parent().parent().find("input[name=tagInput]").select();
  });  

  $(document).on("click", ".rmvEntryBtn", function(){
    $(this).parent().parent().remove();
    numListEntries--;
    localStorage.setItem("numListEntries", numListEntries);
    saveList();
  });

  $("input[name=advOptions]").click(function(){
    if($(this).is(":checked")){
      $("#listCtrl").show();
    } else{
      $("#listCtrl").hide();
    }
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

      var date1 = Number($(entry1).find("input[name=dueInput_sort]").val());
      var date2 = Number($(entry2).find("input[name=dueInput_sort]").val());
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
    saveList();
  });

  $("#filterForm").submit(function(event){
    event.preventDefault();
  });

  $("input[name=filterInput]").keypress(function(key){
    if(key.which === 13){
      $("#filterBtn").trigger("click");
    }
  });

  $("#filterBtn").click(function(){
    var filter = $("input[name=filterInput]").val().toLowerCase();
    if(filter === ""){
      filter = "important";
    }

    $(".listEntry").each(function(){
      var entryClasses = $(this).prop("class").toLowerCase();
      if(!entryClasses.includes(" " + filter + " ")
        && entryClasses.slice(-(filter.length + 1), entryClasses.length) !== " " + filter){
        $(this).hide();
      }
    });

    $("input[name=filterInput]").val("");
  });

  $("#showAll").click(function(){
    $(".listEntry").show();
  });

  $("#toggleTags").click(function(){
    if($("#toDoList").hasClass("tags-hidden")){
      $("#toDoList").removeClass("tags-hidden");
      $(".tag").show();
    } else{
      $("#toDoList").addClass("tags-hidden");
      $(".tag").hide();
    }
  });

  $("#removeAll").click(function(){
    $(".listEntry").remove();
    numListEntries = 0;
    localStorage.setItem("numListEntries", numListEntries);
    saveList();
  });
});

/* Functions ---------------------------------------------------------------- */

function addEntry(txt){
  var entryTxt = "<li>" + txt + "</li>";
    
  var dueInput_disp = "<input type='text' name='dueInput_disp'>";
  var dueInput_sort = "<input type='text' name='dueInput_sort'>";
  var addTag = "<div class='addTag'>";
  addTag += "<input type='text' placeholder='Important' name='tagInput'>";
  addTag += "<span class='glyphicon glyphicon-plus addTagBtn'></span>";
  addTag += "</div>";

  var entryDesc = "<div class='entryDesc'>" + dueInput_disp + dueInput_sort + addTag + "</div>";

  var entryMain = "<div class='entryMain'>" + entryTxt + entryDesc + "</div>";

  var entryCtrl = "<div class='entryCtrl'>";
  entryCtrl += "<span class='glyphicon glyphicon-time dueBtn'></span>";
  entryCtrl += "<span class='glyphicon glyphicon-tags showAddTag'></span>";
  entryCtrl += "<span class='glyphicon glyphicon-remove rmvEntryBtn'></span>";
  entryCtrl += "</div>"
    
  var listEntry = "<div class='listEntry'>" + entryMain + entryCtrl + "</div>";

  $("#toDoList").append(listEntry);
  $("input[name=entryTxt]").val("");

  $("input[name=dueInput_disp]").hide();
  $(".addTag").hide();
}

function addTag(tag, $listEntry){
  var entryClasses = $listEntry.prop("class").toLowerCase();
  if( !entryClasses.includes(" " + tag.toLowerCase() + " ") 
    && entryClasses.slice(-(tag.length + 1), entryClasses.length) !== " " + tag.toLowerCase()){
    $listEntry.find(".entryDesc").append("<div class='tag'>" + tag + "</div>");
    $listEntry.addClass(tag);
  }
  $listEntry.find("input[name=tagInput]").val("");
  $listEntry.find(".addTag").hide();
  if($("#toDoList").hasClass("tags-hidden")){
    $(".tag").hide();
  }
}

function loadList(){
  for(var i = 0; i < numListEntries; i++){
    addEntry(localStorage.getItem("listEntryTxt" + i));
    if(localStorage.getItem("listEntryTags" + i) === ""){
      continue;
    }
    var tagArr = localStorage.getItem("listEntryTags" + i).split(" ");
    for(var j = 0; j < tagArr.length; j++){
      if(tagArr[j] === "due"){
        var dueDate = localStorage.getItem("listEntryDue" + i);
        $(".listEntry").eq(i).find(".entryDesc").prepend("<div class='tag dueTag'>" + dueDate + "</div>");
        $(".listEntry").eq(i).addClass("due");
        if($("#toDoList").hasClass("tags-hidden")){
          $(".tag").hide();
        }
      } else{
        addTag(tagArr[j], $(".listEntry").eq(i));       
      }
    }
  }  
}

function saveList(){
  for(var i = 0; i < numListEntries; i++){
    localStorage.setItem("listEntryTxt" + i, $(".entryMain li").eq(i).text());
    if($(".listEntry").eq(i).prop("class").length > 9){
      var tags = $(".listEntry").eq(i).prop("class");
      tags = tags.substring(10, tags.length);
      localStorage.setItem("listEntryTags" + i, tags);
      if($(".listEntry").eq(i).hasClass("due")){
        var dueDate = $(".listEntry").eq(i).find(".dueTag").text()
        localStorage.setItem("listEntryDue" + i, dueDate);
      } else{
        localStorage.removeItem("listEntryDue" + i);
      }
    } else{
      localStorage.setItem("listEntryTags" + i, "");
    }
  }
}